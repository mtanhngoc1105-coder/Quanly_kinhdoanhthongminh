import React from "react";

export default function TrackingTimeline({ events = [] }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold mb-3">Order Tracking</h4>
      <ol className="space-y-3">
        {events.length === 0 && <li className="text-sm text-slate-500">No events yet.</li>}
        {events.map((e, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
            <div>
              <div className="text-sm font-medium">{e.title}</div>
              <div className="text-xs text-slate-500">{e.time}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}