#!/usr/bin/env bash
set -u

pkill -f "vite.*5173" >/dev/null 2>&1 || true
nohup npx vite --host 0.0.0.0 --port 5173 >/tmp/startupfair-vite.log 2>&1 &

for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:5173/ >/dev/null 2>&1; then
    echo "StartupFair preview is running on port 5173."
    exit 0
  fi
  sleep 1
done

echo "StartupFair preview did not start. Log output:" >&2
cat /tmp/startupfair-vite.log >&2 || true
exit 1
