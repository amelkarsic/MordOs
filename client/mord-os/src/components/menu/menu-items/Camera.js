import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../../shared/Button";
import { Loader } from "../../shared/Loader";

export const Camera = () => {
  const [isLoading, setIsLoading] = useState(true);

  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  const takePicture = () => {
    const width = 400;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);
    //TODO: submit to API and you can show them on gallery
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <Flexbox>
          <Video ref={videoRef} />
          <Button onClick={takePicture}>Take a selfie</Button>
          Your recent selfie
          <canvas ref={photoRef}></canvas>
        </Flexbox>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Video = styled.video`
  width: 60%;
  height: 60%;
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    display: block;
    margin: 10px 0 10px 0;
  }
`;
