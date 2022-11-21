const { DataError } = require("../model/data-error");
const { Marker } = require("../model/marker");
class MarkerService {
  constructor() {
    this.hasError = false;
    this.marker = null;
    this.errors = [];
  }
  loadData(marker) {
    var parsedmarker = JSON.parse(marker);
    if (this.validateMarker(parsedmarker)) {
      let loadedMarker = this.loadMarker(parsedmarker);
      if (loadedMarker) {
        this.marker = loadedMarker;
      } else {
        this.hasError = true;
      }
    }
  }
  loadMarker(marker) {
    try {
      let createdMarker = new Marker(marker.Id, marker.Value);
      return createdMarker;
    } catch (error) {
      this.errors.push(new DataError(error.message, marker));
    }
    return null;
  }
  get getMarker() {
    return this.marker;
  }
  validateMarker(marker) {
    let requiredProps = "Id Value".split(" ");
    let hasErrors = false;
    for (let field of requiredProps) {
      if (!marker[field]) {
        this.errors.push(new DataError(`invalid field ${field}`, parsedMarker));
        hasErrors = true;
      }
    }
    return !hasErrors;
  }
  get isSuccess() {
    return !this.hasError;
  }
  get isFailure() {
    return this.hasError;
  }
}
module.exports = { MarkerService };
