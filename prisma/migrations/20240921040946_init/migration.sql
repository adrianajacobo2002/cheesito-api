-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'MESERO', 'COCINERO') NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesa` (
    `id_mesa` INTEGER NOT NULL AUTO_INCREMENT,
    `num_mesa` INTEGER NOT NULL,
    `estado` ENUM('OCUPADO', 'DISPONIBLE') NOT NULL,
    `capacidad` INTEGER NOT NULL,

    PRIMARY KEY (`id_mesa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orden` (
    `id_orden` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `estado` ENUM('POR_PAGAR', 'CANCELADO') NOT NULL,
    `nombre_cliente` VARCHAR(191) NOT NULL,
    `mesero_id` INTEGER NOT NULL,
    `mesa_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_orden`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesero` (
    `id_mesero` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_mesero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleOrden` (
    `id_detalle_orden` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_id` INTEGER NOT NULL,
    `platillo_id` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `estado` ENUM('EN_PREPARACION', 'LISTO') NOT NULL,

    PRIMARY KEY (`id_detalle_orden`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `id_factura` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_id` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `propina` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,

    UNIQUE INDEX `Factura_orden_id_key`(`orden_id`),
    PRIMARY KEY (`id_factura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventario` (
    `id_inventario` INTEGER NOT NULL AUTO_INCREMENT,
    `platillo_id` INTEGER NOT NULL,
    `cantidad_disponible` INTEGER NOT NULL,

    PRIMARY KEY (`id_inventario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Platillo` (
    `id_platillos` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `tipo` ENUM('COMIDA', 'BEBIDA') NOT NULL,

    PRIMARY KEY (`id_platillos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_mesero_id_fkey` FOREIGN KEY (`mesero_id`) REFERENCES `Mesero`(`id_mesero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_mesa_id_fkey` FOREIGN KEY (`mesa_id`) REFERENCES `Mesa`(`id_mesa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleOrden` ADD CONSTRAINT `DetalleOrden_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `Orden`(`id_orden`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleOrden` ADD CONSTRAINT `DetalleOrden_platillo_id_fkey` FOREIGN KEY (`platillo_id`) REFERENCES `Platillo`(`id_platillos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `Orden`(`id_orden`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_platillo_id_fkey` FOREIGN KEY (`platillo_id`) REFERENCES `Platillo`(`id_platillos`) ON DELETE RESTRICT ON UPDATE CASCADE;
