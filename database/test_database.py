"""Database constraints tested with synthetic data only; no deployment or mail is sent."""
from pathlib import Path
import sqlite3,unittest
SQL=(Path(__file__).parent/'001_initial.sql').read_text()
class DatabaseTests(unittest.TestCase):
 def setUp(self):
  self.db=sqlite3.connect(':memory:');self.db.executescript(SQL)
  self.db.execute("INSERT INTO app_users(id,auth_subject) VALUES('u1','test|1')")
  self.db.execute("INSERT INTO talent_profiles(id,user_id) VALUES('p1','u1')")
  self.db.execute("INSERT INTO form_submissions(id,reference,kind,owner_user_id) VALUES('s1','TEST-001','general_inquiry','u1')")
 def tearDown(self):self.db.close()
 def test_private_by_default(self):self.assertEqual(self.db.execute("SELECT visibility,approved_fields_json,status FROM talent_profiles").fetchone(),('private','[]','draft'))
 def test_contacts_are_separate(self):
  cols=[r[1] for r in self.db.execute('PRAGMA table_info(talent_profiles)')];self.assertFalse(set(cols)&{'email','phone','city','legal_name'})
 def test_no_arbitrary_email_recipient(self):
  with self.assertRaises(sqlite3.IntegrityError):self.db.execute("INSERT INTO email_outbox(id,submission_id,category,recipient,template_key,idempotency_key) VALUES('e','s1','general','evil@example.test','inquiry','key')")
 def test_all_four_email_destinations(self):
  for category,name in [('general','hello'),('challenges','challenges'),('talent','talent'),('partners','partners')]:self.db.execute('INSERT INTO email_outbox(id,submission_id,category,recipient,template_key,idempotency_key) VALUES(?,?,?,?,?,?)',(category,'s1',category,name+'@startupfair.org','notify',category))
  self.assertEqual(self.db.execute('SELECT count(*) FROM email_outbox').fetchone()[0],4)
 def test_invalid_json_rejected(self):
  with self.assertRaises(sqlite3.IntegrityError):self.db.execute("INSERT INTO submission_steps(submission_id,step_key,answers_json) VALUES('s1','contact','not-json')")
 def test_orphan_step_rejected(self):
  with self.assertRaises(sqlite3.IntegrityError):self.db.execute("INSERT INTO submission_steps(submission_id,step_key,answers_json) VALUES('missing','contact','{}')")
 def test_all_request_types_supported(self):
  self.db.execute("INSERT INTO challenges(id,slug,title,model) VALUES('c','test','Test','talent')")
  for kind in ['general_inquiry','challenge_application','challenge_proposal','talent_profile','hiring_request','partnership_inquiry']:self.db.execute('INSERT INTO form_submissions(id,reference,kind,challenge_id) VALUES(?,?,?,?)',(kind,kind,kind,'c' if kind=='challenge_application' else None))
 def test_duplicate_notifications_rejected(self):
  q="INSERT INTO email_outbox(id,submission_id,category,recipient,template_key,idempotency_key) VALUES(?,'s1','general','hello@startupfair.org','notify','same-key')";self.db.execute(q,('first',))
  with self.assertRaises(sqlite3.IntegrityError):self.db.execute(q,('second',))
 def test_organization_pending_by_default(self):
  self.db.execute("INSERT INTO organizations(id,name) VALUES('o','Test organization')");self.assertEqual(self.db.execute('SELECT verification_status FROM organizations').fetchone()[0],'pending')
 def test_work_samples_not_shared_by_default(self):
  self.db.execute("INSERT INTO work_samples(id,profile_id,title,external_url) VALUES('w','p1','Test','https://example.test')");self.assertEqual(self.db.execute('SELECT share_approved FROM work_samples').fetchone()[0],0)
if __name__=='__main__':unittest.main()
