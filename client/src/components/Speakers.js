import SpeakersToolbar from "./SpeakersToolbar";
import SpeakersList from "./SpeakersList";
import { SpeakerFilterProvider } from "../context/SpeakerFilterContext";

function Speakers({ email }) {
  return (
    <SpeakerFilterProvider startingShowSessions={false}>
      <SpeakersToolbar />
      <SpeakersList email={email} />
    </SpeakerFilterProvider>
  );
}

export default Speakers;
