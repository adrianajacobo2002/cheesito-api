import express from "express";
import PlatilloController from "../controllers/platilloController";
import multer from "multer";

const router = express.Router();

// Configuración de Multer: Guardar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const cleanFileName = file.originalname.replace(/\s+/g, "-"); // Reemplazar espacios por guiones
    cb(null, uniqueSuffix + "-" + cleanFileName);
  },
});

const upload = multer({ storage: storage });

// Rutas para el CRUD de platillos
router.get("/platillos", PlatilloController.getAll);
router.get("/platillos/:id", PlatilloController.getById);
router.post("/platillos", upload.single("file"), PlatilloController.create); // Requiere imagen
router.patch(
  "/platillos/:id",
  upload.single("file"),
  PlatilloController.update
); // Opcionalmente puede cambiar imagen
router.delete("/platillos/:id", PlatilloController.delete);

export default router;
