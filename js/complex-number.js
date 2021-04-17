/**
 * Angred
 * 
 * @module ComplexNumber
 * @author Ángel Tornero Hernández
 * @date 30 Mar 2021
 * @brief ComplexNumber class
 * @link https://en.wikipedia.org/wiki/Complex_number
 *
 */
'use strict';

/** Class representing a complex number. */
class ComplexNumber {
  /** @private */
  #real;
  /** @private */
  #imaginary;

  /**
  * Create a complex.
  * @param {Number} realPart 
  * @param {Number} imaginaryPart 
  */
  constructor(realPart, imaginaryPart) {
    this.#real = realPart;
    this.#imaginary = imaginaryPart;
  }

  /**
  * Get real part of complex.
  * @returns {Number}
  */
  getReal() {
    return this.#real;
  }

  /**
  * Set real part of complex.
  * @param {Number} newReal 
  */
  setReal(newReal) {
    this.#real = newReal;
  }

  /**
  * Get imaginary part of complex.
  * @returns {Number}
  */
  getImaginary() {
    return this.#imaginary;
  }

  /**
  * Set imaginary part of complex.
  * @param {Number} newImaginary 
  */
  setImaginary(newImaginary) {
    this.#imaginary = newImaginary;
  }

  /**
  * Sum of complex.
  * @param {ComplexNumber} complex
  * @return {ComplexNumber} - Sum
  */
  add(complex) {
    return new ComplexNumber(this.#real + complex.getReal(), this.#imaginary + complex.getImaginary());
  }

  /**
  * Subtraction of complex.
  * @param {ComplexNumber} complex
  * @return {ComplexNumber} - Rest
  */
  subtract(complex) {
    return new ComplexNumber(this.#real - complex.getReal(), this.#imaginary - complex.getImaginary());
  }

  /**
  * Multiplication of complex.
  * @param {ComplexNumber} complex 
  * @return {ComplexNumber} - Product
  */
  multiply(complex) {
    let product = new ComplexNumber(0, 0);
    product.setReal((this.#real * complex.getReal()) - (this.#imaginary * complex.getImaginary()));
    product.setImaginary((this.#real * complex.getImaginary()) + (this.#imaginary * complex.getReal()));
    return product;
  }

  /**
  * Division of complex.
  * @param {ComplexNumber} complex
  * @return {ComplexNumber} - Division
  */
  divide(complex) {
    let division = new ComplexNumber(0, 0);
    const denom = complex.getReal() * complex.getReal() + complex.getImaginary() * complex.getImaginary();
    division.setReal(((this.#real * complex.getReal() + this.#imaginary * complex.getImaginary()) / denom));
    division.setImaginary(((complex.getReal() * this.#imaginary - this.#real * complex.getImaginary()) / denom));
    return division;
  }

  /**
  * Calculates the absolute value of a complex.
  * @returns {Number}
  */
  absoluteValue() {
    return Math.sqrt(this.#real * this.#real + this.#imaginary * this.#imaginary);
  }

  /**
  * Calculates the conjugate of a complex.
  * @returns {ComplexNumber}
  */
  conjugate() {
    return new ComplexNumber(this.#real, this.#imaginary * -1);
  }

  /**
  * Converts a complex into a string.
  * @returns {String} - Complex number formatted.
  */
  toString() {
    let strComplex = '';
    if (this.#real != 0) {
      strComplex += String(this.#real);
    }
    if (this.#imaginary > 0) {
      strComplex += '+';
    }
    if (this.#imaginary === 1) {
      strComplex += 'i';
    } else if (this.#imaginary === -1) {
      strComplex += '-i';
    } else if (this.#imaginary !== 0) {
      strComplex += `${String(this.#imaginary)}i`;
    }
    return strComplex;
  }
}
