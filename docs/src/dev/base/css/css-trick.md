**Session**

Today I want to share some css tricks with you guys, I hope it will be helpful for you.

↓

Here is the outline for today's session, there are four chapters, which are:

- Clickable area ([ˈeriə])
- Box model
- How to draw ([drɔː]) a triangle
- how to implement a typewriter animation

So let's get started.

↓

**Clickable area**

🏃🏻‍♀️

If we have a button in the page, it has a small size for layout so that it’s not easy for users to click.

But if we set it up like this, we can increase its clickable area by adding a pseudo [ˈsudoʊ] element, which will improve the user experience.

it’s a simple but practical ([ˈpræktɪkl]) stuff

↓

Next one is

**Box model**

What does the box model means?

↓

When laying out a document, the browser's rendering engine represents each element as a rectangular box.

CSS determines the size, position, and properties of these boxes.

↓

Every box is composed of four parts:

- _content_
- _padding_
- _border_
- margin

↓

So, what box models are available in css?

↓

CSS has **two** box models, I used to call them the standard box model and IE box model.

Some others like flex-box, we won't discuss today

↓

The standard box model

It’s the specification([ˌspesɪfɪˈkeɪʃn]) defined by W3C organization.

And it’s the **default** behavior of most browsers.

The feature of standard box model is: width and height will only used for the content area.

↓

If we have a box with a width and height of one hundred pixels, along with a ten pixels border and a twenty pixels padding, when it’s rendered, its true size will be one hundred and sixty pixels.

↓

The IE box model

It’s the strange behavior of IE5 and 6 versions

The feature of IE box model is: the width and height will include not only _content area_, but also _padding_ and border

↓

If we have a box with a width and height of one hundred pixels, which also has a border and padding, when it’s rendered, its true size will indeed be one hundred pixels.

So how to set the type of box model?

↓

css has a property

named box-sizing, it has three possible values

the first one is content-box, which is the default value and it represents the standard box model.

the second one is border-box, which represents the IE box model.

The last one is inherit.

↓

So when could we use it?

(打开一个 figma)

For example,

usually we receive a design, we can easily measure ([ˈmeʒər]) the entire width and padding of an element, but when we want to set the width for it,

we have to subtract [səbˈtrækt] the padding on both sides from the entire width, and the result is the value of width.

This is very annoying [əˈnɔɪɪŋ] because if the designer adjusts the padding or border width, we have to re-calculate.

Another approach is to directly set the value of box-sizing to border-box, so we can directly set the width as the measured width, and no matter how to modify the padding and border, we don’t need to re-calculate.

↓

Alright, next round we aim to draw a triangle

Let’s jump to the code-pen. 🏃🏻‍♀️

As you can see, here is a normal element with a one pixel green border.

We start by modifying the color of its border in each direction. (边框设置 red blue orange)

Then we modify the width of the border.

At this point we can see four fancy trapezoids [ˈtræpəzɔɪz] 踹坡 z 爱 z

Then we change its size to zero

The goal is very close

Let's keep the borders in only one direction.( 修改后面三个边框颜色为透明)

Now we get a down triangle

We can change direction of the triangle(调整 transparent 顺序)

Or shape of the triangle(修改边框宽度为 40px 100px)

↓

The previous chapters are relatively easy, and finally we proceed to a difficult one.

**(Typewriter animation)**

Let's take a look at the final result

↓

It’s like a typewriter, the words are displayed one by one, while a blinking cursor at the end of the sentence.

Before we start coding, let's analyze ([ˈænəlaɪz]) how to implement this animation.

At the beginning, the container width should be zero, and then gradually increase

so that the text is gradually displayed

until it reaches the actual width, meanwhile, there should be a blinking cursor on the right side of the container.

We can use the right border to act as a vertical line,

and then simulate ([ˈsɪmjuleɪt]) the cursor by changing the visibility of the line repeatedly.

Okay, let's go to the code pen and tinker [ˈtɪŋkər] with it 🏃🏻‍♀️

As the base, we have an element with the class name container in the outer.

The first task is to implement an animation

that increments the width of the container from 0

We define an animation by @keyframes keyword,

(@keyframes)

and name it typing

(@keyframes typing)

It should have only two states.

The initial state is zero width

@keyframes typing {

from {

width: 0;

}

}

The final state is real width, the width under the default state

We set to two hundred pixels first

(width: 200px)

Then we add this animation to the element.

We use

animation property,

(animation:)

Let's take a look at the animation property

↓

first value is animation-name

↓

Specify the name of one or more [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) at-rules describing the animation or animations to apply to the element.

here it’s tying 🏃🏻‍♀️

(animation: typing)

↓

The second is animation-duration,

configures the length of time that an animation should take to complete one cycle.

🏃🏻‍♀️

We expect finish in two seconds.

(animation: typing 2s)

↓

The third value is animation-timing-function

Configures the timing of the animation

how the animation transitions through keyframes.

that is, the execution [ˌeksɪˈkjuːʃn] rhythm of the animation

🏃🏻‍♀️

Here, our sentence has thirty seven characters and we expect it to be completed in thirty seven steps

so it should be set to steps37

(animation: typing 2s steps(37))

↓

We can use the steps keyword

it’s a function that represents defines a step function

dividing the animation in

equidistant [ˌiːkwɪˈdɪstənt] steps, it can receive two arguments,

the first is a positive int, indicating how many steps the animation is divided into, and the second argument is optional, a keyword indicating if the function is left- or right-continuous

(I’m not going to talk much about it)

🏃🏻‍♀️(回来执行一下 run)

Yeah, it's almost what we want, but there are still some flaws[flɔz], as we can see, the letters are displayed half.

This problem is due to the two hundred pixels width, because it’s impossible to guarantee that every step of the two hundred pixels is a complete letter.

So, here I’d like to introduce a different size unit, ch

↓

Ch is a short for character, it's a relative unit, representing the width of the character "0" in the current font.

Let's go back to the code 🏃🏻‍♀️

so we should set the container width to thirty seven ch

(width: 37ch) 然后 run

It seems that it is not quite as expected

we find that after the end of the animation

the actual width of the container is wider than 37 letters

Okay, another point.

↓

In fact, there are two major types of fonts in computers.

One is Monospaced font and the other is Proportional [prəˈpɔːrʃənl] font

↓

As the name implies,

Each character occupies the same amount of space on a line of text.

The following are all monospaced font

↓

Proportional font each character occupies only as much width as it needs.

The following are all proportional font

🏃🏻‍♀️

We didn’t set the font in the code, so the default font is Times, which is a proportional font.

Let's change to a monospaced font (字体设置为 monospace)

(font-family: monospace;)

Perfect!

Finally let's implement the cursor

set the right border of the container

(border-right: 3px solid;)

and then define another animation blink

(@keyframes blink {})

We expect it to blink constantly, so we can set its border-color to transparent at the halfway point

@keyframes blink {

50% {

border-color: transparent;

}

}

Use it for the container

(Blink 1s steps(1, end))

it can be abbreviated [əˈbriːvieɪtɪd] 鹅布瑞 v 诶 ted

as step-end,

you just need to know it means

the animation will jump directly to the final state.

I would also like to add this

(加上 infinite 然后看 ppt 先别运行)

↓

[ˌɪtəˈreɪʃn]

animation-iteration-count

Configures the number of times the animation should repeat; you can specify infinite to repeat the animation indefinitely[ɪnˈdefɪnətli].

🏃🏻‍♀️ （执行一下 run）

Finish!

When the content of our text changes, we just need to count how many characters there are and this animation will still work well.

(加一个感叹号 修改成 38)

That's all.

↓

Thanks guys, if you have any questions, feel free to hit me in the slack!
