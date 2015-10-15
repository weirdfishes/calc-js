/* Controller handles calculations and binding
*/

var calc = angular.module("calc", []);

calc.controller('Ctrl', function($scope){


  window.debug_scope = $scope;

  $scope.output = "0";
  $scope.newNumber = true;
  $scope.pendingOperation = null;
  $scope.operationToken = "";
  $scope.runningTotal = 0;
  $scope.pendingValue = null;
  $scope.lastOperation = null;

  // Constants
  var ADD = "adding";
  var SUBTRACT = "subtracting";
  var MULTIPLY = "multiplying";
  var DIVIDE = "dividing";
  var ADD_TOKEN = "+";
  var SUBTRACT_TOKEN = "-";
  var MULTIPLY_TOKEN = "*";
  var DIVIDE_TOKEN = "/";


  //handles output of result
  $scope.updateOutput = function(btn) {
    if($scope.output == "0" || $scope.newNumber) {
      $scope.output = btn;
      $scope.newNumber = false;
    } else {
        $scope.output += String(btn);
    }
    $scope.pendingValue = toNumber($scope.output);
  };


  //called when '+' is clicked
  //sets pending operation to ADD, and handles previous operation in the stack
  //if there are pending operations that haven't been calculated, they will be completed before adding.
  $scope.add = function() {
    if($scope.pendingValue) {
      if($scope.runningTotal && $scope.pendingOperation == ADD ) {
        $scope.runningTotal += $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == SUBTRACT ) {
        $scope.runningTotal -= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == MULTIPLY ) {
        $scope.runningTotal *= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == DIVIDE ) {
        $scope.runningTotal /= $scope.pendingValue;
      }
      else {
        $scope.runningTotal = $scope.pendingValue;
      }
    }
    setOperationToken(ADD);
    setOutput(String($scope.runningTotal));
    $scope.pendingOperation = ADD;
    $scope.newNumber = true;
    $scope.pendingValue = null;
  };

  //called when '-' is clicked
  //sets pending operation to SUBTRACT, and handles previous operation in the stack
  //if there are pending operations that haven't been calculated, they will be completed before subtracting.
  $scope.subtract = function() {
    if($scope.pendingValue) {
      if($scope.runningTotal && ($scope.pendingOperation == SUBTRACT) ) {
        $scope.runningTotal -= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == ADD ) {
        $scope.runningTotal += $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == MULTIPLY ) {
        $scope.runningTotal *= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == DIVIDE ) {
        $scope.runningTotal /= $scope.pendingValue;
      }
      else {
        $scope.runningTotal = $scope.pendingValue;
      }
    }
    setOperationToken(SUBTRACT);
    setOutput(String($scope.runningTotal));
    $scope.pendingOperation = SUBTRACT;
    $scope.newNumber = true;
    $scope.pendingValue = null;
  };

  //called when '*' is clicked
  //sets pending operation to MULTIPLY, and handles previous operation in the stack
  //if there are pending operations that haven't been calculated, they will be completed before multiplying.
  $scope.multiply = function() {

    if($scope.pendingValue) {
      if($scope.runningTotal && $scope.pendingOperation == ADD ) {
        $scope.runningTotal += $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == SUBTRACT ) {
        $scope.runningTotal -= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == MULTIPLY ) {
        $scope.runningTotal *= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == DIVIDE ) {
        $scope.runningTotal /= $scope.pendingValue;
      }
      else {
        $scope.runningTotal = $scope.pendingValue;
      }
    }
    setOperationToken(MULTIPLY);
    setOutput(String($scope.runningTotal));
    $scope.pendingOperation = MULTIPLY;
    $scope.newNumber = true;
    $scope.pendingValue = null;


  };

  //called when '/' is clicked
  //sets pending operation to DIVIDE, and handles previous operation in the stack
  //if there are pending operations that haven't been calculated, they will be completed before dividing.
  $scope.divide = function() {

    if($scope.pendingValue) {
      if($scope.runningTotal && $scope.pendingOperation == ADD ) {
        $scope.runningTotal += $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == SUBTRACT ) {
        $scope.runningTotal -= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == MULTIPLY ) {
        $scope.runningTotal *= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == DIVIDE ) {
        $scope.runningTotal /= $scope.pendingValue;
      }
      else {
        $scope.runningTotal = $scope.pendingValue;
      }
    }
    setOperationToken(DIVIDE);
    setOutput(String($scope.runningTotal));
    $scope.pendingOperation = DIVIDE;
    $scope.newNumber = true;
    $scope.pendingValue = null;

  };


  //called when '.' is clicked
  //adds a decimal point to the output if the value does not already have one
  //if the output already has a decimal, nothing will be done
  $scope.decimal = function() {

    var str = $scope.output;
    if (!hasDecimal(str)) {
      $scope.output += ".";
      $scope.newNumber = false;
    }

    $scope.pendingValue = toNumber($scope.output);

  };

  //called when '+/-' is clicked
  //toggles positive/negative sign of the output
  $scope.toggleSign = function() {
    $scope.output = (0 - parseFloat($scope.output)).toString();
    $scope.pendingValue = toNumber($scope.output);
  };


  //called when '=' is clicked
  //handles all of the calculations and sets pending and previous operation variables as appropriatem
  $scope.calculate = function() {
    if(!$scope.newNumber) {
      $scope.pendingValue = toNumber($scope.output);
      $scope.lastValue = $scope.pendingValue;
    }
    if($scope.pendingOperation == ADD) {
      $scope.runningTotal += $scope.pendingValue;
      $scope.lastOperation = ADD;
    } else if($scope.pendingOperation == SUBTRACT) {
      $scope.runningTotal -= $scope.pendingValue;
      $scope.lastOperation = SUBTRACT;
    } else if($scope.pendingOperation == MULTIPLY) {
      $scope.runningTotal *= $scope.pendingValue;
      $scope.lastOperation = MULTIPLY;
    } else if($scope.pendingOperation == DIVIDE) {
      $scope.runningTotal /= $scope.pendingValue;
      $scope.lastOperation = DIVIDE;
    } else {
      if($scope.lastOperation) {
        if($scope.lastOperation == ADD) {
          if($scope.runningTotal) {
            $scope.runningTotal += $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        } else if($scope.lastOperation == SUBTRACT) {
          if($scope.runningTotal) {
            $scope.runningTotal -= $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        } else if($scope.lastOperation == MULTIPLY) {
          if($scope.runningTotal) {
            $scope.runningTotal *= $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        } else if($scope.lastOperation == DIVIDE) {
          if($scope.runningTotal) {
            $scope.runningTotal /= $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        }
      } else {
        $scope.runningTotal = 0;
      }
    }
    setOutput(formatFloat($scope.runningTotal));
    setOperationToken();
    $scope.pendingOperation = null;
    $scope.pendingValue = null;
  };

  $scope.clear = function() {
    $scope.runningTotal = null;
    $scope.pendingValue = null;
    $scope.pendingOperation = null;
    setOutput("0");
    $scope.operationToken = "";
  };

  function setOutput(outputString) {
    $scope.output = outputString;
    $scope.newNumber = true;
  }

  function formatFloat(output) {
    if(output.toString().length > 13)
      output = output.toPrecision(13);

    return output;
  }

  function setOperationToken(operation) {
    if(operation == ADD) {
      $scope.operationToken = ADD_TOKEN;
    } else if (operation == SUBTRACT) {
      $scope.operationToken = SUBTRACT_TOKEN;
    } else if(operation == MULTIPLY) {
      $scope.operationToken = MULTIPLY_TOKEN;
    } else if(operation == DIVIDE) {
      $scope.operationToken = DIVIDE_TOKEN;
    } else {
      $scope.operationToken = "";
    }
  }

  function toNumber(numberString) {
    var result = 0;
    if(numberString) {
      result = numberString*1;
    }
    return result;
  }

  function hasDecimal(str) {
    for(var i = 0; i < str.length; i++) {
      if(str[i] == '.')
        return true;
    }
    return false;
  }
});
