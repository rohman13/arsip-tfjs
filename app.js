const tf = require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

const category = [
  'Berita acara Pencacahan dan perajangan pita cukai rusak, sisa baik, dan pelat cetak rusak',
  'Berita acara Pencacahan Etil Alkohol (EA) dan Minuman Mengandung Etil Alkohol',
  'Dokumen Pemasukan ke Tempat Penimbunan Berikat (TPB)',
  'Dokumen Penetapan Tarif Cukai dan Golongan Perusahaan',
  'Dokumen Produksi Barang Kena Cukai (BKC)',
  'Inward manifest I outward manifest (BC 1.1) dan dokumen kelengkapannya',
  'Izin impor sementara',
  'Izin kawasan pabean',
  'Izin tempat penimbunan sementara',
  'Keputusan pembekuan NPPBKC',
  'Keputusan pemberian Nomor Pokok pengusaha barang Kena cukai (NPPBKC)',
  'Keputusan pencabutan NPPBKC',
  'Keputusan Penetapan harga Jual Eceran (HJE) dan Tarif cukai',
  'Laporan',
  'laporan kawasan Berikat',
  'Laporan Pangkalan Sarana Operasi',
  'laporan pemanfaatan Sarana operasi',
  'laporan produksi BKC',
  'Lembar pemeliharaan saran operasi lainnya',
  'Non Arsip',
  'Pemberitahuan impor barang untuk ditimbun di TPB (BC 2.3)',
  'Pemesanan pita cukai (CK-1 dan CK-1A)',
  'Persuratan',
  'Rencana Kedatangan Sarana Pengangkut / Jadwal Kedatangan Sarana Pengangkut (RKSP / JKSP) (BC 1.0)'
];


//init USE
const init = async () => {
  const useModel = await use.load();
  const model = await tf.loadLayersModel('file://./model-1c/model.json');
  console.log("loaded!");
  return { useModel, model };
}


const runApp = async (initializer, title) => {
  console.log(initializer);
  const encoded = await initializer.useModel.embed(title.toLowerCase());
  const prediction = await initializer.model.predict(encoded).array();

  const tensorResults = prediction[0]

  let result = tensorResults.map((tensorVal, i) => {
    let properties = {
      "category": category[i],
      "confidence": tensorVal.toFixed(4)
    }
    return properties;
  });

  result.sort((a, b) => {
    return parseFloat(b.confidence) - parseFloat(a.confidence);
  });

  return result;
}

//test aja
const test = () => {
  return "hahahah";
}

exports.init = init;
exports.test = test;
exports.runApp = runApp;