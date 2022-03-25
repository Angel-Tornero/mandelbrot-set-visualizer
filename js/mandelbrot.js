/**
 * Angred
 * 
 * @module Mandelbrot
 * @author Ángel Tornero Hernández
 * @date 14 Abr 2021
 * @brief Mandelbrot class
 * @link https://en.wikipedia.org/wiki/Mandelbrot_set
 *
 */

'use strict';

/** Class for representing graphicly the Mandelbrot set */
class Mandelbrot {
  /** @private */
  #maxIterations;
  /** @private */
  #leftRealLimit;
  /** @private */
  #topImaginaryLimit;
  /** @private */
  #rightRealLimit;
  /** @private */
  #botImaginaryLimit;
  /** @private */
  #width;
  /** @private */
  #height;
  /** @private */
  #colours = [
    [207, 0, 48],
    [223, 0, 32],
    [255, 0, 0],
    [255, 61, 0],
    [255, 82, 0],
    [255, 123, 0],
    [255, 165, 0],
    [255, 210, 0],
    [255, 255, 0],
    [200, 246, 72],
    [144, 238, 144],
    [72, 246, 72],
    [0, 255, 0],
    [86, 235, 115],
    [173, 216, 230],
    [86, 108, 115],
    [0, 0, 255],
    [64, 0, 191],
    [128, 0, 128],
    [191, 0, 64],
    [0, 0, 0]
  ];

  /**
  * Create a mandelbrot object.
  * @param {Number} maxIterations - Maximus number of iterations when calculating.
  * @param {Number} width - Width of pixel map.
  * @param {Number} height - Height of pixel map.
  */
  constructor(maxIterations, width, height) {
    this.#maxIterations = maxIterations;
    this.#leftRealLimit = -2;
    this.#topImaginaryLimit = 2;
    this.#rightRealLimit = 2;
    this.#botImaginaryLimit = -2;
    this.#width = width;
    this.#height = height;
  }

  /**
  * Method that repeats the operation Zi = Zi-1 + C to know if a complex is on
  * Mandelbrot set and how many iterations needed to reach the condition.
  * @param {ComplexNumber} complexC - The complex number we want to know if is
  * on Mandelbrot set. 
  * @return {Number} - Returns the number of iterations that were necesary to
  * reach the condition.
  */
  getIterations(complexC) {
    let itCounter = 0;
    let complexZ = new ComplexNumber(0, 0);
    while (complexZ.absoluteValue() <= 2 && itCounter < this.#maxIterations) {
      complexZ = complexZ.multiply(complexZ).add(complexC);
      itCounter++;
    }
    return itCounter;
  }

  /**
  * Calculates the colour that corresponds to given complex number position.
  * @param {ComplexNumber} complex - Position of complex plane we want to know
  * the colour.
  * @returns {Array<Number>} - Colour in RGB format.
  */
  getColour(complex) {
    const iterationNumber = this.getIterations(complex);
    if (iterationNumber === this.#maxIterations) {
      return this.#colours[this.#colours.length - 1];
    }
    return this.#colours[iterationNumber % (this.#colours.length - 1)];
  }

  /**
  * Method that draws the graphic of mandelbrot set on given Canvas.
  * @param {Object} canvas - Html canvas element (must be 3:2 size).
  */
  drawOnCanvas(canvas) {
    let ctx = canvas.getContext('2d');
    let imageData = ctx.createImageData(this.#width, this.#height);
    let data = imageData.data;
    for (let i = 0; i < this.#width; i++) {
      for (let j = 0; j < this.#height; j++) {
        const dataIndex = (j * this.#width + i) * 4;
        const real = this.#leftRealLimit + i / this.#width *
          (this.#rightRealLimit - this.#leftRealLimit);

        const imaginary = this.#botImaginaryLimit + j / this.#height *
          (this.#topImaginaryLimit - this.#botImaginaryLimit);

        const colour = this.getColour(new ComplexNumber(real, imaginary));
        data[dataIndex] = colour[0];
        data[dataIndex + 1] = colour[1];
        data[dataIndex + 2] = colour[2];
        data[dataIndex + 3] = 255;
        
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  /**
  * Calculate the area and error using the Monte Carlo method.
  * @param {Number} numberOfPoints - N value.
  * @returns {Array<Number>} - Array with first element area value and second
  * element error value
  */
  calculateArea(numberOfPoints) {
    let insidePoints = 0;
    for (let i = 0; i < numberOfPoints; i++) {
      const randomComplex = new ComplexNumber(Math.random() * 2.5 - 2, Math.random() * 1.125);
      if (this.getIterations(randomComplex) === this.#maxIterations) {
          insidePoints++;
      }
    }
    const area = 2 * 2.5 * 1.125 * insidePoints / numberOfPoints;
    const error = area / Math.sqrt(numberOfPoints);
    return [area, error];
  }
}
