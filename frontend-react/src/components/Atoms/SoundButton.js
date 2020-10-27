import React, { useState, useEffect } from "react";

const useAudio = url => {
  const audio = new Audio(url);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const SoundButton = (props) => {
  const [playing, toggle] = useAudio(props.soundUrl);

  return (
    <div  className={props.className}>
      {playing ? <span onClick={toggle} className="fa fa-volume-off fa-3x text-info float-left" /> : <span onClick={toggle} className="fa fa-volume-up text-info fa-3x float-left" />}
    </div>
  );
};

export default SoundButton;