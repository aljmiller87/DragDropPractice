var state = {
    optionA: false,
    optionB: false,
    optionC: false,
    optionD: false
}

toastr.options = {
	"positionClass": "toast-bottom-center",
	"timeOut": 0,
	"extendedTimeOut": 0,
	"closeButton": true
};

$('.btn').click(function() {
    location.reload();
});


function checkAnswers(option, state) {
    var allQuestionsAnswered = true

    if (option === "a") {
        state.optionA = true;
        $("#a").addClass("gray");
        $("#checkA").toggleClass("hidden");
    } else if (option === "b") {
        state.optionB = true;
        $("#b").addClass("gray");
        $("#checkB").toggleClass("hidden");
    } else if (option === "c") {
        state.optionC = true;
        $("#c").addClass("gray");
        $("#checkC").toggleClass("hidden");
    } else if (option === "d") {
        state.optionD = true;
        $("#d").addClass("gray");
        $("#checkD").toggleClass("hidden");
    } 

    Object.keys(state).forEach(function(answer) {
        if(state[answer] === false) {
            allQuestionsAnswered = false
        }
    });

    if(allQuestionsAnswered === true) {
    	$(".question-container").addClass("hidden");
    	$(".next-lesson").toggleClass("hidden");

    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	var answer;
    ev.preventDefault();
    var option = ev.target.id;
    var data = ev.dataTransfer.getData("text");
    
    if (option === "answerOpenCircuit") {
    	if (data === "a" || data ==="b") {
    		answer = true;
    		toastr.success('If there is a break in the circuit, the electrons cannot return to the source and now electrons can "flow" in the circuit. The situation when no current flows is an OPEN circuit.');
    		checkAnswers(data, state);
    	} else {
    		answer = false;
    		toastr.error('The electrons flow from the battery, through the motor, and do not make it back to the battery due to a break in the circuit. It may be a switch or an actual break in the wiring.');
    	}
    } else if (option === "answerClosedCircuit") {
    	if (data === "d") {
    		answer = true;
    		toastr.success('For the current to flow, there must be a complete path. Note that the electrons flow from the battery through the motor and back to the battery. This is called a CLOSED circuit.');
    		checkAnswers(data, state);
    	} else {
    		answer = false;
    		toastr.error('Because the circuit is closed, the electrons flow from the battery, through the motor, and back to the battery.');
    	}

    } else if (option === "answerShortedCircuit") {
    	if (data === "c") {
    		answer = true;
    		toastr.success('The correct definistion of a SHORT circuit is represented here. The current has found a shorter path back to the source, instead of going through the resistance of the full circuit.')
    		checkAnswers(data, state);
    	} else {
    		answer = false;
    		toastr.error('This shows the circuit is probably shorted somewhere. You know there is a motor that should cause some potential difference, but the current is taking a "short cut" back to the source.');
    	}
    }

    
}
