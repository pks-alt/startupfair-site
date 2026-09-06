"use client";

import { useState } from "react";
import { EVENT_TELECASTS } from "@/lib/event-telecasts";

type Telecast = (typeof EVENT_TELECASTS)[number];

function TelecastCard({ video }: { video: Telecast }) {
  const [loaded, setLoaded] = useState(false);
  const headingId = `telecast-${video.id}-title`;
  return (
    <article className="telecast-card" aria-labelledby={headingId}>
      <div className="telecast-player">
        {loaded ? (
          <iframe
            src={video.embedUrl}
            title={`StartupFair ${video.title}`}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="telecast-load"
            onClick={() => setLoaded(true)}
            aria-label={`Load ${video.title} player`}
          >
            <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
              <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M20 15 L34 24 L20 33 Z" fill="currentColor" />
            </svg>
            <span>Load video</span>
          </button>
        )}
      </div>
      <div className="telecast-caption">
        <h3 id={headingId}>{video.title}</h3>
        <p>Historical StartupFair event recording.</p>
        <a
          className="telecast-youtube-link"
          href={video.watchUrl}
          target="_blank"
          rel="noopener"
          aria-label={`Open ${video.title} on YouTube (new tab)`}
        >
          Open on YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export function EventTelecasts() {
  return (
    <div className="event-telecasts">
      <div className="telecast-grid">
        {EVENT_TELECASTS.map(video => <TelecastCard key={video.id} video={video} />)}
      </div>
      <p className="telecast-help">
        Select Load video to connect to YouTube. No YouTube player loads before you select it.
        If a recording cannot play here, use Open on YouTube. YouTube’s privacy terms apply when its player loads.
      </p>
    </div>
  );
}
