import React, { useRef, useState } from "react";
// import { OnVideoPlay, PlayVideo, PauseVideo, BackTenSeconds, ForwardTenSeconds, VideoSlider, VideoMute, FullScreen, OnVideoClose } from "../services/svg.service.js";

// import video from '../assets/video/girls-play.mp4';
import { useVideoPlayer } from "../hooks/useVideoPlayer";

export const VideoModal = () => {
    const videoElement = useRef(null)
    const [progress, setProgress] = useState()

    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
    } = useVideoPlayer(videoElement);

    const handleTenSecJump = (diff) => {
        setProgress(prevCount => prevCount + diff)
    }

    return (
        <div className="modal-video-container">
            <div className="video-wrapper">
                {/* <video
                    src={require('../assets/video/girls-play.mp4')}
                    ref={videoElement}
                    onTimeUpdate={handleOnTimeUpdate}
                /> */}
                {/* <OnVideoClose />
                <div className="video-controls">
                    <OnVideoPlay /> */}
                <div className="play-again">Play again</div>
            </div>
            <div className="video-box">
                <div className="video-actions-container">
                    {/* <button onClick={togglePlay}><span>
                            {!playerState.isPlaying ? (
                                <PlayVideo className="play-btn" />
                            ) : (
                                <PauseVideo className="pause-btn" />
                            )}
                        </span>
                        </button> */}
                    {/* <div className="ten-second-actions"> */}
                    {/* <button onClick={() => handleTenSecJump(-10)}><BackTenSeconds />
                            </button> */}
                    {/* <button onClick={() => handleTenSecJump(+10)}><ForwardTenSeconds />
                            </button> */}
                    {/* <div className="time-update">
                                <span>6:19</span>
                            </div> */}

                    {/* <div className="video-slider" aria-label="Seek slider" aria-valuemax="379.477333" aria-valuemin="0" aria-valuenow="379.477333" role="slider" tabindex="0"> */}
                    {/* <div className="_mo76f4i"></div>? */}
                    {/* <div className="slider-starts" style="width: 0%;"></div>
                                <div className="slider-ends" style="width: 100%;"></div> */}
                    {/* <div className="back-slider" style="left: 100%;">
                                    <div className="slider-plus"></div>
                                </div> */}
                    {/* </div> */}
                    {/* <div className="slider-vis-progress">
                                <span className="progress-start-value"><span>0:00</span></span></div>
                        </div> */}
                    {/* <div className="end-value"><span>6:19</span></div>
                </div> */}
                    {/* <VideoSlider />
                <VideoMute />
                <FullScreen />
            </div> */}
                    {/* <input
                type="range"
                min="0"
                max="100"
                value={playerState.progress}
                onChange={(e) => handleVideoProgress(e)}
            />
            <select
                className="velocity"
                value={playerState.speed}
                onChange={(e) => handleVideoSpeed(e)}
            >
                <option value="0.50">0.50x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="2">2x</option>
            </select>
            <button className="mute-btn" onClick={toggleMute}>
                {!playerState.isMuted ? (
                    <i className="bx bxs-volume-full"></i>
                ) : (
                    <i className="bx bxs-volume-mute"></i>
                )}
            </button> */}
                </div>
            </div>
        </div>
    );
};

