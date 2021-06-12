# A play of circles

This is a simplistic particle demo using only DOM.

It'll first go through a standard 8-part animation demonstration that lasts 2 minutes. Then it'll enter an infinite loop of a random selection between 6 of these animations, each round lasting from 20 to 60 minutes.

Each circle is a div with `border-radius:50%` with added `filter:blur()` and `opacity` and moves with `translateX()` and `translateY()`. The fact that I use DOM makes it slower than it would if I'd used WebGL.

This demo exists in monochromatic universe where everything is cyan. In a future version I can add more colors and I can give a second (and third) focus (and color) on the circles with `::before` and `::after`. Another thing that begs to be implemented is non-linear movement -- it isn't immediatelly obvious in this demo, but all circles move linearly.

The demo isn't coded in a modular way so it'll take some work on your part to use it as a library in your project.

Open `demo.html` to start the demo. You can see it in action on [my websit](https://alekv.com/portfolio/circles/intro.html).


