declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}

declare module '@azesmway/react-native-unity' {
    import { ComponentType } from 'react';
    import { ViewProps } from 'react-native';
  
    export interface UnityViewProps extends ViewProps {
      onUnityMessage?: (event: any) => void;
      androidKeepPlayerMounted?: boolean;
      fullScreen?: boolean;
    }
  
    export default class UnityView extends React.Component<UnityViewProps> {
      postMessage(gameObject: string, methodName: string, message: string): void;
      unloadUnity(): void;
      pauseUnity(pause: boolean): void;
      resumeUnity(): void;
    }
  }
  