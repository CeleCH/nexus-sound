"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "local" | "youtube";

export default function Home() {
  const [mode, setMode] = useState<Mode>("local");
  const [files, setFiles] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentTitle, setCurrentTitle] = useState("No song");
  const [progress, setProgress] = useState(0);

  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ===== RESTORE SETTINGS ===== */
  useEffect(() => {
    const v = localStorage.getItem("nexus_volume");
    const m = localStorage.getItem("nexus_muted");
    const md = localStorage.getItem("nexus_mode");

    if (v) setVolume(Number(v));
    if (m) setMuted(m === "true");
    if (md) setMode(md as Mode);
  }, []);

  useEffect(() => {
    localStorage.setItem("nexus_volume", volume.toString());
    localStorage.setItem("nexus_muted", muted.toString());
  }, [volume, muted]);

  const changeMode = (m: Mode) => {
    setMode(m);
    localStorage.setItem("nexus_mode", m);
  };

  /* ===== AUDIO CONTROL ===== */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  const seek = (v: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    audioRef.current.currentTime =
      (v / 100) * audioRef.current.duration;
  };

  /* ===== LOCAL MUSIC ===== */
  const loadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const list = Array.from(e.target.files);
    setFiles(list);
    playLocal(list[0], 0);
  };

  const playLocal = (file: File, index: number) => {
    if (!audioRef.current) return;
    audioRef.current.src = URL.createObjectURL(file);
    audioRef.current.play();
    setCurrentIndex(index);
    setCurrentTitle(file.name);
  };

  const next = () => {
    if (currentIndex === null || files.length === 0) return;
    const i = (currentIndex + 1) % files.length;
    playLocal(files[i], i);
  };

  /* ===== YOUTUBE ===== */
  const getYoutubeEmbed = (url: string) => {
    const id = url.split("v=")[1]?.split("&")[0];
    return id ? `https://www.youtube.com/embed/${id}` : "";
  };

  return (
    <div className="h-screen flex bg-neutral-950 text-white">
      {/* SIDEBAR */}
      <aside className="w-60 bg-neutral-900 p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">🎧 Nexus Sound</h1>

        <button
          onClick={() => changeMode("local")}
          className={`px-4 py-3 rounded-lg ${
            mode === "local"
              ? "bg-green-600"
              : "hover:bg-neutral-800 text-gray-400"
          }`}
        >
          🎵 Local
        </button>

        <button
          onClick={() => changeMode("youtube")}
          className={`px-4 py-3 rounded-lg ${
            mode === "youtube"
              ? "bg-green-600"
              : "hover:bg-neutral-800 text-gray-400"
          }`}
        >
          ▶ YouTube
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 p-10 overflow-y-auto">
          {mode === "local" && (
            <>
              <label className="bg-green-600 px-6 py-3 rounded-full cursor-pointer">
                + Añadir música
                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  hidden
                  onChange={loadFiles}
                />
              </label>

              <div className="mt-6 space-y-3">
                {files.map((file, i) => (
                  <div
                    key={i}
                    onClick={() => playLocal(file, i)}
                    className="bg-neutral-900 px-6 py-4 rounded-lg hover:bg-neutral-800 cursor-pointer flex justify-between"
                  >
                    <span className="truncate">{file.name}</span>
                    ▶
                  </div>
                ))}
              </div>
            </>
          )}

          {mode === "youtube" && (
            <div className="flex flex-col items-center gap-6">
              <input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Pega link de YouTube"
                className="px-5 py-3 rounded-full bg-neutral-800 w-96"
              />

              {youtubeUrl && (
                <iframe
                  width="420"
                  height="236"
                  src={getYoutubeEmbed(youtubeUrl)}
                  allow="autoplay"
                  className="rounded-xl"
                />
              )}
            </div>
          )}
        </section>

        {/* PLAYER (SOLO LOCAL) */}
        {mode === "local" && (
          <footer className="h-24 bg-neutral-900 border-t border-neutral-800 px-8 flex items-center justify-between">
            <div className="truncate max-w-xs">{currentTitle}</div>

            <div className="flex flex-col gap-2 w-full max-w-md">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="accent-green-500"
              />

              <div className="flex gap-6 justify-center text-xl">
                <button onClick={() => audioRef.current?.play()}>▶</button>
                <button onClick={() => audioRef.current?.pause()}>⏸</button>
                <button onClick={next}>⏭</button>
                <button onClick={() => setMuted(!muted)}>
                  {muted ? "🔇" : "🔊"}
                </button>
              </div>
            </div>
          </footer>
        )}
      </main>

      <audio ref={audioRef} />
    </div>
  );
}
