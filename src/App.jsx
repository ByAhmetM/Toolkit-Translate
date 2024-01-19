import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect, useMemo, useState } from "react";
import { getLanguages, translateText } from "./redux/translateActions";
import Select from "react-select";
import { setTranslated } from "./redux/translateSlice";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translate);

  const [text, setText] = useState();

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const refinedData = useMemo(
    () =>
      state.languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      })),
    [state.languages]
  );

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    setText(state.translatedText);
    dispatch(setTranslated(text));
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri+</h1>
        <div className="upper">
          <Select
            onChange={setSourceLang}
            className="select"
            options={refinedData}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            value={sourceLang}
          />
          <button onClick={handleSwap}>Değiş</button>
          <Select
            onChange={setTargetLang}
            className="select"
            options={refinedData}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            value={targetLang}
          />
        </div>
        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            {state.isTranslateLoading && (
              <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <textarea value={state.translatedText} disabled />
          </div>
        </div>
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
