import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../constant";
import axios from "axios";

//bütün dilleri alma
export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    const res = await axios.request(options);
    return res.data.data.languages;
  }
);

// çevirme

export const translateText = createAsyncThunk(
  "translate/translateText",

  async ({ sourceLang, targetLang, text }) => {
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "df04d70410msh904fd0a2269d085p1e8076jsn31eb30dc63c8",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    const res = await axios.request(options);
    return res.data.data.translatedText;
  }
);
