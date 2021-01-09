const runApp = require('./app');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
var init;

app.use(cors());

app.use(bodyParser.json());

app.get("/url", (req, res) => {
  return res.json("test");
});

const test = [{ "category": "Dokumen Penetapan Tarif Cukai dan Golongan Perusahaan", "confidence": "0.0906" }, { "category": "Inward manifest I outward manifest (BC 1.1) dan dokumen kelengkapannya", "confidence": "0.0894" }, { "category": "Non Arsip", "confidence": "0.0221" }, { "category": "Keputusan Penetapan harga Jual Eceran (HJE) dan Tarif cukai", "confidence": "0.0113" }, { "category": "Pemberitahuan impor barang untuk ditimbun di TPB (BC 2.3)", "confidence": "0.0042" }, { "category": "Persuratan", "confidence": "0.0035" }, { "category": "Izin tempat penimbunan sementara", "confidence": "0.0028" }, { "category": "Laporan", "confidence": "0.0014" }, { "category": "Keputusan pembekuan NPPBKC", "confidence": "0.0011" }, { "category": "Izin impor sementara", "confidence": "0.0009" }, { "category": "Laporan Pangkalan Sarana Operasi", "confidence": "0.0002" }, { "category": "Izin kawasan pabean", "confidence": "0.0001" }, { "category": "laporan kawasan Berikat", "confidence": "0.0001" }, { "category": "laporan pemanfaatan Sarana operasi", "confidence": "0.0001" }, { "category": "Pemesanan pita cukai (CK-1 dan CK-1A)", "confidence": "0.0001" }, { "category": "Berita acara Pencacahan dan perajangan pita cukai rusak, sisa baik, dan pelat cetak rusak", "confidence": "0.0000" }, { "category": "Berita acara Pencacahan Etil Alkohol (EA) dan Minuman Mengandung Etil Alkohol", "confidence": "0.0000" }, { "category": "Dokumen Pemasukan ke Tempat Penimbunan Berikat (TPB)", "confidence": "0.0000" }, { "category": "Dokumen Produksi Barang Kena Cukai (BKC)", "confidence": "0.0000" }, { "category": "Keputusan pemberian Nomor Pokok pengusaha barang Kena cukai (NPPBKC)", "confidence": "0.0000" }, { "category": "Keputusan pencabutan NPPBKC", "confidence": "0.0000" }, { "category": "laporan produksi BKC", "confidence": "0.0000" }, { "category": "Lembar pemeliharaan saran operasi lainnya", "confidence": "0.0000" }, { "category": "Rencana Kedatangan Sarana Pengangkut / Jadwal Kedatangan Sarana Pengangkut (RKSP / JKSP) (BC 1.0)", "confidence": "0.0000" }];

app.post('/predict', async (req, res, next) => {
  const predict = await runApp.runApp(init, req.body.title);
  return res.json(predict);
  //return res.json(test);
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  //init = await runApp.init();
});

