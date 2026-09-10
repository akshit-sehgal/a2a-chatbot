#!/bin/sh
# Pushes the "View my jobs" reply to sessionId 1 through /sse/push.
# The app reads its session id from the encUserId URL param, so open the
# client at http://localhost:5173/?encUserId=1 to receive this.

curl -X POST http://localhost:4000/sse/push -H 'Content-Type: application/json' -d '{"sessionId":"1","data":{"type":"textNode","text":"Your 3 most recent roles:<ul><li><strong>Senior Backend Engineer</strong> — Gurugram · ₹28–40 LPA · 18 applicants · Live</li><li><strong>Product Designer</strong> — Remote (India) · ₹18–26 LPA · 42 applicants · Live</li><li><strong>QA Automation Lead</strong> — Bengaluru · ₹22–30 LPA · 7 applicants · Closing</li></ul>","actions":["Post a job","Review applicants"],"data":{}}}'
