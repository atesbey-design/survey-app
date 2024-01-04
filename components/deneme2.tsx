import React, { useState } from "react";
import SurveyContainer from "./deneme";

const AnketEklemeSayfasi = () => {
  const [anketTur, setAnketTur] = useState("");
  const [anketBasligi, setAnketBasligi] = useState("");
  const [sorular, setSorular] = useState<any>([]);

  const handleAnketEkle = () => {
    // Kullanıcının girdiği bilgileri kullanarak anket verisi oluştur
    const yeniAnket = {
      type: anketTur,
      title: anketBasligi,
      questions: sorular,
      onChange: (selectedValues: any) => {
        console.log("Selected Values:", selectedValues);
        // Burada seçilen değeri kullanarak istediğiniz işlemleri yapabilirsiniz.
      },
    };

    // Oluşturulan anket verisini SurveyContainer bileşenine iletebilir veya saklayabilirsiniz.
    // Örneğin, bir API'ye göndererek kalıcı olarak saklanabilir.
    console.log("Yeni Anket Verisi:", yeniAnket);

    // İlgili durumları sıfırla
    setAnketTur("");
    setAnketBasligi("");
    setSorular([]);
  };

  return (
    <div>
      <h1>Anket Ekleme Sayfası</h1>
      <label>
        Anket Türü:
        <select value={anketTur} onChange={(e) => setAnketTur(e.target.value)}>
          <option value="">Anket Türü Seçin</option>
          <option value="radio">Radio</option>
          <option value="rating">Rating</option>
          <option value="selection">Selection</option>
          {/* Diğer anket türleri buraya eklenebilir */}
        </select>
      </label>
      <br />
      <label>
        Anket Başlığı:
        <input
          type="text"
          value={anketBasligi}
          onChange={(e) => setAnketBasligi(e.target.value)}
        />
      </label>
      <br />
      {/* Soruları ve seçenekleri girmek için uygun alanları ekleyin */}
      {/* Örneğin, bir form içinde bir döngü ile soruları oluşturabilirsiniz */}
      <label>
        Soru 1:
        <input
          type="text"
          onChange={(e) => setSorular([{ title: e.target.value, options: [] }])}
        />
      </label>
      <br />
      {/* Diğer sorular buraya eklenebilir */}
      <button onClick={handleAnketEkle}>Anketi Ekle</button>

      {/* Oluşturulan anket verisini SurveyContainer bileşenine iletebilirsiniz */}
      <SurveyContainer data={[]} />
    </div>
  );
};

export default AnketEklemeSayfasi;
