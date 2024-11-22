import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import UnityView from '@azesmway/react-native-unity';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

// Define the interface for the ref object, so TypeScript knows what methods are available
export interface UnityGameRef {
  resumeUnity: () => void;
}

interface UnityGameProps {
  onUnityMessage?: (message: string) => void;
}

// Use forwardRef and pass the correct type for the ref argument
export const UnityGame = forwardRef<UnityGameRef, UnityGameProps>((props, ref) => {
  const unityRef = useRef<UnityView>(null);

  useEffect(() => {
    if (unityRef?.current) {
      const message: IMessage = {
        gameObject: 'gameObject',
        methodName: 'methodName',
        message: 'message',
      };
      unityRef.current.postMessage(
        message.gameObject,
        message.methodName,
        message.message
      );
    }
  }, []);

  useImperativeHandle(ref, () => ({
    resumeUnity() {
      if (unityRef.current) {
        unityRef.current.resumeUnity();
        console.log("Unity Resumed");
      }
    },
  }));

  return (
    <UnityView
      ref={unityRef}
      style={{ flex: 1, zIndex: 0 }}
      androidKeepPlayerMounted={true}
      onUnityMessage={(result) => {
        const message = result.nativeEvent.message as string;
        console.log('onUnityMessage', message);
        if (props.onUnityMessage) {
          props.onUnityMessage(message);
        }
      }}
    />
  );
});
