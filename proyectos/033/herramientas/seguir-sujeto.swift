// seguir-sujeto.swift — dónde está la cara y el cuerpo de la presentadora en cada fotograma.
//
// Para qué: el material de la Casa Campestre llega en 16:9 y el reel es 9:16, así que cada plano
// se ENCUADRA: una ventana vertical que recorre el cuadro apaisado siguiendo a Isabella. Esa
// ventana se calcula en `normalizar.mjs` desde las medidas de este script (Vision de Apple, local,
// sin descargas), no a ojo: en 9426/9427 ella camina hacia la cámara y una ventana fija la perdería.
//
// Uso:   swift proyectos/033/herramientas/seguir-sujeto.swift <carpeta-de-pngs> > medidas.json
// Salida: un objeto por PNG (en orden de nombre) con la cara y el cuerpo en coordenadas normalizadas
//         (0-1, origen ARRIBA a la izquierda, como el vídeo): {"f":"IMG_9411_0001.png","cara":[x,y,w,h]|null,"cuerpo":[x,y,w,h]|null}
import Foundation
import Vision
import CoreGraphics
import ImageIO

let carpeta = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "."
let archivos = (try FileManager.default.contentsOfDirectory(atPath: carpeta))
    .filter { $0.hasSuffix(".png") }.sorted()

func rect(_ r: CGRect) -> [Double] {
    // Vision da el origen ABAJO a la izquierda: se pasa a ARRIBA.
    return [Double(r.origin.x), Double(1 - r.origin.y - r.size.height), Double(r.size.width), Double(r.size.height)]
}

var salida: [[String: Any]] = []
for nombre in archivos {
    let url = URL(fileURLWithPath: carpeta).appendingPathComponent(nombre)
    guard let fuente = CGImageSourceCreateWithURL(url as CFURL, nil),
          let imagen = CGImageSourceCreateImageAtIndex(fuente, 0, nil) else { continue }
    let caras = VNDetectFaceRectanglesRequest()
    let cuerpos = VNDetectHumanRectanglesRequest()
    cuerpos.upperBodyOnly = false
    let manejador = VNImageRequestHandler(cgImage: imagen, options: [:])
    try? manejador.perform([caras, cuerpos])
    // La mayor (la presentadora es siempre la protagonista del plano).
    let cara = (caras.results ?? []).max { $0.boundingBox.width * $0.boundingBox.height < $1.boundingBox.width * $1.boundingBox.height }
    let cuerpo = (cuerpos.results ?? []).max { $0.boundingBox.width * $0.boundingBox.height < $1.boundingBox.width * $1.boundingBox.height }
    var fila: [String: Any] = ["f": nombre]
    fila["cara"] = cara.map { rect($0.boundingBox) } ?? NSNull()
    fila["cuerpo"] = cuerpo.map { rect($0.boundingBox) } ?? NSNull()
    salida.append(fila)
}
let datos = try JSONSerialization.data(withJSONObject: salida, options: [.sortedKeys])
FileHandle.standardOutput.write(datos)
