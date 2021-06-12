
/////////////////////////////
//
//
// Global vars
//
//
/////////////////////////////

/*
* By setting this to false you stop the addition of new circles.
*/
var global_running = true;

/*
* I'm filling this with bool vars to show which sets are currently active.
*/
var set_running = [];

/*
* Stores the div that the circles are added in.
*/
var parent_div;

/*
* This list needs to agree with the list of vars in :root, in circles.css.
*/
var bg = [ '--medium', '--bright', '--bright2', '--bright3', '--color4', '--color5', '--color6', '--color7', '--bg1', '--bg2' ]

/*
* Tracks the unique ids I give to the circles.
*/
var circle_id = 0;

/*
* Sets of circles.
*/

// Small dots (not tiny) moving relatively quickly.
var set1 =
[
	// Little dots that are a bit blurry. They look good even without adding anything else.
	{
		size: [ 0.015, 0.020 ],
		opacity: [ 0.2, 0.3, ],
		duration: 10000,
		blur_start: 0.001,
		blur_end: [ 0, 0.01 ],
		z_index: [ 1, 10 ],
		spawn_simultaneously: 3,
		spawn_frequency: 1000,
		move_x: [ -0.4, 0.4 ],
		move_y: [ -0.4, 0.4 ],
	},
	
	// Little dots that are completely clear. They complement the above.
	{
		size: [ 0.015, 0.020 ],
		opacity: [ 0.06, 0.12, ],
		duration: 5000,
		blur: 0,
		z_index: [ 70, 99 ],
		spawn_simultaneously: 2,
		spawn_frequency: 3000,
		move_x: [ -0.1, 0.1 ],
		move_y: [ -0.1, 0.1 ],
	},
];

// Few tiny dots moving fast.
var set2 =
[
	{
		size: [ 0.001, 0.005 ],
		opacity: [ 0.1, 0.7, ],
		duration: 5000,
		blur_start: 0.001,
		blur_end: [ 0, 0.001 ],
		z_index: [ 1, 10 ],
		spawn_simultaneously: 10,
		spawn_frequency: 1000,
		move_x: [ -0.9381, 0.9381 ],
		move_y: [ -0.9381, 0.9381 ],
	},

];

// Many tiny dots moving fast.
var set3 =
[
	{
		size: [ 0.001, 0.005 ],
		opacity: [ 0.1, 0.7, ],
		duration: 5000,
		blur_start: 0.001,
		blur_end: [ 0, 0.001 ],
		z_index: [ 1, 10 ],
		spawn_simultaneously: 100,
		spawn_frequency: 1000,
		move_x: [ -0.9381, 0.9381 ],
		move_y: [ -0.9381, 0.9381 ],
	},
];

// A cloud with some slow moving blury small circles. They produce a small banding artifact because browsers don't produce bluring so effectively.
var set4 =
[
	// Small blurry (till very blurry) dots. They look like stars or a nebulla.
	{
		size: [ 0.015, 0.020 ],
		opacity: [ 0.2, 0.3, ],
		duration: 7000,
		blur: [ 0.01, 0.05 ],
		z_index: [ 11, 20 ],
		spawn_simultaneously: 50,
		spawn_frequency: 1000,
		move_x: [ -0.02, 0.02 ],
		move_y: [ -0.02, 0.02 ],
	},
	
	// Same as the above but the dots are less blurry so they look like fireflies.
	{
		size: [ 0.015, 0.020 ],
		opacity: [ 0.2, 0.3, ],
		duration: 7000,
		blur: [ 0.005, 0.01 ],
		z_index: [ 70, 99 ],
		spawn_simultaneously: 50,
		spawn_frequency: 1000,
		move_x: [ -0.02, 0.02 ],
		move_y: [ -0.02, 0.02 ],
	},
];

// Medium sized circles with enough blur to make it look like bokeh fireflies. The most magical of them all. Appart from size and spawn_simultaneously, the settings are identical to set4.
var set5 =
[
	{
		size: [ 0.015, 0.10 ],
		opacity: [ 0.2, 0.3, ],
		duration: 7000,
		blur: [ 0.01, 0.05 ],
		z_index: [ 11, 20 ],
		spawn_simultaneously: 5,
		spawn_frequency: 1000,
		move_x: [ -0.02, 0.02 ],
		move_y: [ -0.02, 0.02 ],
	},
	{
		size: [ 0.015, 0.10 ],
		opacity: [ 0.2, 0.3, ],
		duration: 7000,
		blur: [ 0.005, 0.01 ],
		z_index: [ 70, 99 ],
		spawn_simultaneously: 5,
		spawn_frequency: 1000,
		move_x: [ -0.02, 0.02 ],
		move_y: [ -0.02, 0.02 ],
	},
];

// Big, a bit blurry, very slowly moving circles, like unrealistic bokeh.
var set8 = 
[
	
	{
		size: [ 0.06, 0.15 ],
		//opacity: [ 0.05, 0.3, ], //older
		opacity: [ 0.1, 0.3, ],
		duration: [ 20000, 25000 ],
		blur: [ 0.003, 0.005 ],
		z_index: [ 70, 99 ],
		spawn_simultaneously: 13,
		spawn_frequency: 15500,
		move_x: [ -0.12, 0.12 ],
		move_y: [ -0.12, 0.12 ],
	},
];

// Flashing lights.
var set10 = 
[
	{
		size: [ 0.015, 0.020 ],
		opacity: 1.0,
		duration: 350,
		blur: 0.03,
		z_index: 60,
		spawn_simultaneously: 1,
		spawn_frequency: 400,
		move_x: 0,
		move_y: 0,
	},
];

// Very simple, for the beginning. Small circles that die quickly. Looks deliberately cheap.
var set11 =
[
	{
		size: [ 0.01, 0.03 ],
		opacity: 1.0,
		duration: [ 1000, 2000 ],
		blur: 0,
		z_index: 1,
		spawn_simultaneously: 7,
		spawn_frequency: 70,
		move_x: 0,
		move_y: 0,
	},
];

// Lots of clear immovable small dots.
var set12 =
[
	{
		size: [ 0.01, 0.03 ],
		opacity: 1.0,
		duration: [ 3000, 7000 ],
		blur: 0,
		z_index: 1,
		spawn_simultaneously: 7,
		spawn_frequency: 70,
		move_x: 0,
		move_y: 0,
	},
];

// Lots of clear very slowly moving medium dots.
var set13 =
[
	{
		size: [ 0.02, 0.07 ],
		opacity: [ 0.02, 0.3 ],
		duration: [ 2000, 4000 ],
		blur: 0,
		z_index: 20,
		spawn_simultaneously: 70,
		spawn_frequency: 300,
		move_x: [ -0.01, 0.01 ],
		move_y: [ -0.01, 0.01 ],
	},
];

/////////////////////////////
//
//
// Functions
//
//
/////////////////////////////

/*
===================
init

Coordinates the whole process. We need to wrap the loop into an async function for 'await' to work: https://stackoverflow.com/questions/3583724/.
===================
*/

window.onload = async function()
{
	const timer = ms => new Promise(res => setTimeout(res, ms))
	var choice,i,wait,wait_human_min,message,needjs;
	
	/*
	* In CSS #film is display:none because it messes the layout of
	* noscript. If JavaScript is enabled then noscript isn't displayed
	* and #film gets display:block.
	*/
	parent_div = document.getElementById('film');
	parent_div.style.opacity = 0;
	parent_div.style.display = "block";
	
	/*
	* When #film appears, it fades in.
	*/	
	parent_div.animate
	({
		opacity: [ '0', '1' ],
	},
	{
		duration: 2000,
	});
	
	/*
	* Somehow we need this.
	*/
	parent_div.style.opacity = 1;

	await timer(2500);

	console.log("first I'll do a run on all the nice sets I've got and in some cases mix them");
	
	console.log("1/8: showing: lots of clear immovable small dots");
	
	set_running[12] = true;
	starter(set12,12);

	await timer(6000);
	
	set_running[12] = false;
	
	console.log("2/8: showing: lots of clear very slowly moving medium dots");

	set_running[13] = true
	starter(set13,13);
		
	await timer(8000);
	
	console.log("3/8: showing: a lot tiny moving dots, like plankton in sea");
	
	set_running[3] = true;
	starter(set3,3);
	
	await timer(3000);
	
	set_running[13] = false;

	await timer(12000);
	
	set_running[3] = false;

	console.log("4/8: showing: small blurry very slowly moving circles, like fireflies in the dim distance");

	set_running[4] = true;
	starter(set4,4);

	await timer(3000);

	console.log("5/8: adding: big, a bit blurry, very slowly moving circles, like unrealistic bokeh");
	
	set_running[8] = true;
	starter(set8,8);

	await timer(10000);
	
	console.log("6/8: adding: some medium blurry and a bit blurry, slowing moving circles, something like bokeh");
	
	set_running[5] = true;
	starter(set5,5);

	await timer(10000);

	set_running[8] = false;

	await timer(10000);

	set_running[4] = false;
	
	await timer(5000);

	console.log("7/8: showing: small slowly moving circles, some blurry others clear, like blood cells or fireflies");
	
	set_running[1] = true;
	starter(set1,1);

	await timer(1000);
	
	set_running[5] = false;
	
	await timer(20000);
	
	set_running[1] = false;

	console.log("8/8: showing: a few tiny moving dots, like plankton in sea");
	
	set_running[2] = true;
	starter(set2,2);
	
	await timer(8000);
	
	set_running[2] = false;
	
	await timer(5000);

	console.log("finished with the demo, I will now go into loop mode of the best effects");

	while (global_running == true) // this loop will stop by pressing F1 or F4
	{
		/*
		* The decission making is hard coded, a really bad practice, but I see no point creating a
		* more complex structure for such a simple demo. The most beautiful pairs are: 1, 1+4, 1+5,
		* 5, 4+5, 5+8, 4+5+8, and in each iteration this loop picks one. I could have used a cookie
		* to cycle through all 8 of them in a way that doesn't repeat.
		*/
		for (i=1; i<8; i++)
			set_running[i] = false;
			
		/*
		* It will wait from 20min to 1hr.
		*/
		wait = random_int(1200000,2400000);
		
		/*
		* Will do a rought calculation in minutes of how long will the current fx play.
		*/
		wait_human_min = Math.round(wait/1000/60);

		choice = random_int(1,7);

		switch (choice)
		{
			case 1:
				set_running[1] = true; starter(set1,1);
				console.log("will show set1 (small slowly moving circles, some blurry others clear, like blood cells or fireflies) for " + wait_human_min + "min, started on " + get_time());
			break;
			case 2:
				set_running[1] = true; starter(set1,1);
				set_running[4] = true; starter(set4,4);
				console.log("will show set1 (small slowly moving circles, some blurry others clear, like blood cells or fireflies) and set4 (small blurry very slowly moving circles, like fireflies in the dim distance) for " + wait_human_min + "min, starting on " + get_time());				
			case 3:
				set_running[1] = true; starter(set1,1);
				set_running[5] = true; starter(set5,5);
				console.log("will show set1 (small slowly moving circles, some blurry others clear, like blood cells or fireflies) and set5 (some medium blurry and a bit blurry, slowing moving circles, something like bokeh) for " + wait_human_min + "min, starting on " + get_time());
			break;
			case 4:
				set_running[5] = true; starter(set5,5);
				console.log("will show set5 (some medium blurry and a bit blurry, slowing moving circles, something like bokeh) for " + wait_human_min + "min, starting on " + get_time());
			break;
			case 5:
				set_running[4] = true; starter(set4,4);
				set_running[5] = true; starter(set5,5);
				console.log("will show set4 (small blurry very slowly moving circles, like fireflies in the dim distance) and set5 (adding: some medium blurry and a bit blurry, slowing moving circles, something like bokeh) for " + wait_human_min + "min, starting on " + get_time());
			break;
			case 6:
				set_running[5] = true; starter(set5,5);
				set_running[8] = true; starter(set8,8);
				console.log("will show set5 (some medium blurry and a bit blurry, slowing moving circles, something like bokeh) and set8 (big, a bit blurry, very slowly moving circles, like unrealistic bokeh) for " + wait_human_min + "min, starting on " + get_time());
			break;
			case 7:
				set_running[4] = true; starter(set4,4);
				set_running[5] = true; starter(set5,5);
				set_running[8] = true; starter(set8,8);
				console.log("will show set4 (small blurry very slowly moving circles, like fireflies in the dim distance), set5 (some medium blurry and a bit blurry, slowing moving circles, something like bokeh), and set8 (big, a bit blurry, very slowly moving circles, like unrealistic bokeh) for " + wait_human_min + "min, starting on " + get_time());
			break;
		}

		await timer(wait);
	}
}

/*
===================
listen to keys

The user can press F1 (key 112) or F4 (key 115) to pause and resume the animation. This was used during development to stop the annimation.
===================
*/

window.onkeydown = function(key)
{
	/*
	* Currently disabled.
	*/
	//key_press(key);
};

function key_press(key)
{
	if (key.which == 115 || key.which == 112)
	{
		if (global_running == true)
		{
			global_running = false;
			console.log("halting everything");
		}
		else
		if (global_running == false)
		{
			global_running = true;
			
			/*
			* From a previous version of the code where it was possible to resume.
			* If I want to have resume facility, I need to code it back in.
			*/
			// starter(); 
		}
	}
}

/*
===================
starter

Starts the spawner_loop() for a given set.
===================
*/

function starter(set,set_id)
{
	var i;
	
	if (global_running == false)
		return false;
	
	for (i=0; i<set.length; i++)
		spawner_loop(set[i],set_id);
}

/*
===================
spawner_loop

Spawns new circles. Once started it'll loop till stopped. Can be stopped with the global var 'global_running'. Gets started from starter(). We need async for 'await' to work, just like in window.onload.
===================
*/

async function spawner_loop(set,set_id)
{
	const timer = ms => new Promise(res => setTimeout(res, ms));
	
	var i,pack={};

	while (global_running == true && set_running[set_id] == true)
	{
		/*
		* I can store set["spawn_simultaneously"] in pack["spawn_simultaneously"] just so it's going
		* to be tidy, but I feel it's a waste.
		*/
		
		for (i=0; i<set["spawn_simultaneously"]; i++)
		{
			pack = interpret(set);
			add_one(pack,circle_id);
			circle_id++;
		}
		
		await timer(pack["spawn_frequency"]);

		/*
		* The program should be able to run indefinately so at some point the id
		* number will surpass JavaScript's largest integer. To avoid that we reset
		* the number every 9mil.
		*/
		if (circle_id == 9000000)
			circle_id = 0;
	}
}

/*
===============================
add_one

Adds one circle in parent_div. The only decision made in this function is the X and Y position of the dot, all other decisions are made in spanwer_loop() and fed to this function (the 'settings').
===============================
*/
function add_one(settings,id)
{
    new_div = document.createElement("div");
	new_div.setAttribute("id", id);
	//new_div.className = "circle"; // not useful right now, might be useful in the future

	new_div.style.width = new_div.style.height = "calc(var(--width) * " + settings["size"] + ")"
	new_div.style.top = "calc(var(--height) * " + random_float(0.0,0.9) + ")"
	new_div.style.left = "calc(var(--width) * " + random_float(0.0,0.9) + ")"
	
	new_div.style.background = "var(--bg1)"; // this doesn't variate
	//new_div.style.background = "var(" + bg[Math.round(random_float() * bg.length)] + ")";
	
	/*
	* The developer has the choice to either set blur_start and blur_end or blur. If both are
	* given, the first case is preferable. If no declaration is made, then blurring is
	* skipped altogether. In a future version this choice shouldn't be, the developer will
	* need to decide if they want a range or a number.
	*/
	if (typeof settings["blur_start"] == 'number' && typeof settings["blur_end"] == 'number')
	{
		/*
		* Syntax from https://stackoverflow.com/questions/59346209/
		*/
		new_div.animate
		({
			filter:
			[
				'blur(calc(100vw * ' + settings["blur_start"] + '))',
				'blur(calc(100vw * ' + settings["blur_end"] + '))',
			],
		},
		{
			duration: settings["duration"],
		});
	}
	else
	if (typeof settings["blur"] == 'number')
	{
		new_div.style.filter = "blur(calc(100vw * " + settings["blur"] + "))";
	}
	
	new_div.animate
	({
		opacity: [ '0', settings["opacity"], '0' ],

		transform:
		[
			'translateX(calc(100vw * ' + settings["move_x"] + '))',
			'translateY(calc(100vw * ' + settings["move_y"] + '))'
		],
	},
	{
		duration: settings["duration"],
		//iterations: 1,
	});

	parent_div.appendChild(new_div);
	
	/*
	* The program should be able to run indefinately and if I don't remove the old
	* ones the DOM will be flooded and crawl to a halt.
	*/
	setTimeout
	(
		function ()
		{
			if (global_running == true) document.getElementById(id).remove();
		},
		settings["duration"],
		//settings["duration"] + 100, // you can also do this but the circles will flash as a result
	);
}

/*
===================
interpret

Most values in a set can be posibilities. interpret() takes these posibilities and decides on them. A posibility is an array with two numbers, so we randomly pick inside the range of these two numbers.
===================
*/

function interpret(set)
{
	var i,k,m,random,gather={},pick,followup=[];
	
	for (const key in set)
	{
		pick = "";
	
		if (typeof set[key] == 'object') // it's a range, pick a random number within the range
		{
			// 'pick' is either a range of 2 integers or there is a float in there.
			if (is_int(pick[0]) && is_int(pick[1]))
				pick = random_int(set[key][0], set[key][1]);
			else
				pick = random_float(set[key][0], set[key][1]);
		}
		else
		if (typeof set[key] == 'number') // it's a number, use it as is
		{
			pick = set[key];
		}

		gather[key] = pick;

	}

	return gather;
}

/*
===================
validate_set

Will check if all the values of a set are valid. It will tell you at which value there is a problem but not where exactly or what the problem is. That's to make the algorithm simpler. In a future version it's a good idea to also tell if you missed a key (field). This function was used during development to make sure the sets were correctly formed.
===================
*/

function validate_set(set)
{
	var i,j,key;

	for (key in set[i]) // each key inside the set
	{
		if
		(
			typeof set[i][key] == 'object'
			&&
			typeof set[i][key][0] == 'object'
		)
		{
			for (j=0; j<set[i][key].length; j++)
			{
				if
				(
					typeof set[i][key][j]["choice"] != 'object'
					||
					set[i][key][j]["choice"].length !== 2
					||
					typeof set[i][key][j]["choice"][0] != 'number'
					||
					typeof set[i][key][j]["choice"][1] != 'number'
					||
					typeof set[i][key][j]["weight"] != 'number'
					
				)
				{
					console.log("Error. In set " + i + " the value of key '" + key + "' is badly formed and this will be dropped due to this. Consult the comments to learn how to form valid values.");
					set.splice(i, 1);
				}
			}
		}
		else			
		if
		(
			typeof set[i][key] != 'number' && typeof set[i][key] != 'object'
			||
			(
				typeof set[i][key] == 'object'
				&&
				(
					set[i][key].length !== 2
					||
					typeof set[i][key][0] !== 'number'
					||
					typeof set[i][key][1] !== 'number'
				)
			)
		)
		{
			/*
			* I opted to repeat the line because I want to inform the tweaker
			* of all the typos in one go.
			*/
			console.log("Error. In set " + i + " the value of key '" + key + "' is badly formed and this set will be dropped due to this. Consult the comments to learn how to form valid values.");
			set.splice(i, 1);
		}
	}
	
}

/*
===================
is_int

Will return TRUE if the given number is an integer and FALSE if it isn't. From: https://stackoverflow.com/questions/3885817/. Note: ECMAScript 5 has .isInteger() which makes this function rendundant.
===================
*/

function is_int(n)
{
	return n % 1 === 0;
}

/*
===================
random_float

Will return a random float in the range min-max. If min is larger than maximum, they will be reversed. Keeps 3 decimal digits. If not given min and/or max the float will be between 0.000 and 1.000. Some code from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random/
===================
*/

function random_float(min, max)
{
	var switcher;
	
	if (min > max)
	{
		switcher = min;
		min = max;
		max = switcher;
	}
	
	if (typeof min == 'undefined' || typeof max =='undefined' || min == max)
		return Number((Math.random()).toFixed(3));
	else
		return Number((Math.random() * (max - min) + min).toFixed(3));
}

/*
===================
random_int

Will return a random integer in the range betwen 'min' and 'max'. If min is larger than max they will be reversed. If min and max are not given it is assumed that are 1 and 100. If max is not given it'll be min+100.
===================
*/

function random_int(min, max)
{
	var switcher;
	
	if (min > max)
	{
		switcher = min;
		min = max;
		max = switcher;
	}

	if (typeof min == 'undefined')
	{
		min = 0;
		max = 100;
	}
		
	if (typeof max == 'undefined' || min == max)
		max = min + 100;

	max++;
	
	return Math.floor(Math.random() * (max - min) + min);
}

/*
===================
get_time

Will return current date and time.
===================
*/

function get_time()
{
	var now = new Date();
	var date = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
	var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	var datetime = date + ' ' + time;
	
	return datetime;
}

/*
===================
die

A super convenient way to stop the program. It's hack but it works. Intended to be used only during development.
===================
*/

function die(message)
{
	var print;
	
	if (typeof message == 'undefined')
		print = "Exit via die()";
	else
		print = "Exit via die(). Message: " + message;

	throw new Error(print);
}

