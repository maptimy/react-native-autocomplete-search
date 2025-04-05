import Svg, { Path, type SvgProps } from 'react-native-svg';

function GlobeLines(props: SvgProps) {
  return (
    <Svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="0"
      {...props}
    >
      <Path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178zM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640z" />
    </Svg>
  );
}

export default GlobeLines;
