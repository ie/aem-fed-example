// Convert foreach to async
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function addCarriageReturn (domObject, position) {
  let carriageReturn = domObject.createTextNode('\n');
  domObject[position].appendChild(carriageReturn);
  return domObject;
}


module.exports = { asyncForEach, addCarriageReturn };
