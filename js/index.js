/**
 * Angred
 * 
 * @author Ángel Tornero Hernández
 * @date 14 Abr 2021
 * @brief Index file for mandelbrot visualizer page that contain
 * useful methods to make the page work correctly.
 *
 */

/**
 * Function that creates the mandelbrot object and draws it on
 * given canvas. Also asks you by web prompt for the limit of
 * iterations.
 * @param {Object} canvasElement - Id of html element that contains the canvas.
 * @param {Object} iterations - Id of html element that contains maximus
 * iterations value.
 */
 const drawGraph = (canvasElement, iterations) => {
  const canvas = document.getElementById(canvasElement);
  const iterationLimit = Number(document.getElementById(iterations).value);
  const mandelbrotVisualizer =
    new Mandelbrot(iterationLimit, canvas.width, canvas.height);
  mandelbrotVisualizer.drawOnCanvas(canvas);
}

/**
 * Function that calls the Mandelbrot method to calculate the
 * area of the set.
 * @param {Object} iterations - Id of html element that contains maximus
 * iterations value.
 * @param {Object} valueN - Id of html element that contains value of N.
 * @param {Object} canvasElement - Id of html element that contains the canvas.
 */
const calculateArea = (iterations, valueN, canvasElement) => {
  const maxIterations = Number(document.getElementById(iterations).value);
  const randomPointsNumber = Number(document.getElementById(valueN).value);
  const canvas = document.getElementById(canvasElement);
  const mandelbrotVisualizer =
    new Mandelbrot(maxIterations, canvas.width, canvas.height);
  const results = mandelbrotVisualizer.calculateArea(randomPointsNumber);

  let context = canvas.getContext('2d');
  context.fillStyle = 'rgba(255, 255, 255, 100)';
  context.fillRect(900, 700, 300, 100);

  context.font = '20px Arial';
  context.fillStyle = 'black';
  context.textAlign = 'left';
  context.fillText('Area: ' + results[0], 910, 730);
  context.fillText('Error: ' + results[1], 910, 760);
}
