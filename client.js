import axios from "axios";

async function run() {
    const res = await axios.post("http://localhost:3001/translate", {
        q: "안녕하세요",
        source: "ko",
        target: "en",
    });

    console.log("전체 응답:", res.data);
    console.log("번역 결과:", res.data.data.translations[0].translatedText);
}

run().catch((err) => {
    console.error("호출 실패:", err.response?.data || err.message);
});
