---
id: 8
author: "swilgosz"
tags: ['rails', 'hanami']
title: "#8 Learn new things easily - mapping Rails to Hanami "
excerpt: "When I've started with learning Hanami, I've struggled a lot because of the different concepts Hanami has over Rails. In this episode of Hanami Mastery I'm mapping Rails to Hanami for easier learning."
videoId: 73oJ-_aldc8
publishedAt: "2021-09-07"
thumbnail:
  full: /images/episodes/8/cover-full.jpeg
  big: /images/episodes/8/cover-big.jpeg
  small: /images/episodes/8/cover-small.jpeg
source: null
---

Recently I gave a talk on [Saint P Ruby meetup](https://www.youtube.com/c/SaintPRubyCommunity) and as I've got nice feedback, I've decided to extract one interesting part to an official Hanami Mastery episode.

This talk, and this episode, was sponsored by [Useo](https://useo.pl).

It was an extremely nice experience for me and I've learned a tremendous amount of stuff about life recordings, which are completely different than recording these episodes.

> Before I start, let me just mention that I'm working on an e-book extending this topic deeply, so if you are opt-in for more content from me related to Rails and Hanami comparison, with code examples and such - you can [join my Github sponsors](https://github.com/sponsors/swilgosz) for access to the early versions of the ebook and having an impact what to cover in it.

In this episode, I'll talk about mapping Hanami to Rails, and especially I'll focus on different building blocks, each of those frameworks has to offer, so it'll easier to grasp Hanami concepts for people with Rich Rails experience and another way around.

### Why mapping concepts is a useful skill

When I've been starting with Hanami, I was really confused at least several times **mostly because of different assumptions Hanami has over Rails**. After several years of development with Rails only, to quickly start with Hanami I needed to MAP certain parts of Rails applications to Hanami just to understand it better and learn faster.

And as I've shown on an example of creating a [dependency graph for DRY-RB ecosystem](/articles/dry-rb-dependency-graph), my brain just works very well when it have visualised diagrams to refer.

### Abstractions

So let's talk about abstractions in Hanami and Rails. I name _abstractions_ all kinds of building blocks you'll need to build your application.

If you have a big experience in Rails, you may be surprised, that Hanami encourages you to have way more abstractions from day one of your development.

This leads to having **fewer but bigger** files in Rails, and more but smaller files in Hanami. Just switching from one framework to another requires a bit of mindset change and a development workflow to be adjusted. I hope this episode will help you with it.

In Rails, you can list all the key abstractions very easily as they are pretty well defined and there are not too many of them

![Rails abstractions](/images/episodes/8/rails-abstractions.png)

So you have:

- routes
- Controllers extendable by concerns
- Models that are also extendable with concerns
- Views that are basically (templates)
- Mailers
- global Helpers

In Hanami, you'll be encouraged to have more abstractions in your system depending on your domain and application structure. By default, Hanami introduces way more building blocks, and some of them you may easily understand if you come from Rails world, but others you'd need to just check as they have no direct mapping to Rails.

![Hanami abstractions](/images/episodes/8/hanami-abstractions.png)

> Quick Notice: If you have used DRY-RB libraries in your Rails projects, you'll have a much easier job, and if you used ROM-RB as your persistence layer, you're pretty much set up already, because Hanami leverages both of those gem families to deliver a complete toolset for building full-featured scalable web applications in Ruby.

![Hanami gems family](/images/episodes/8/hanami-gems-family.png)

So we have routes and actions instead of controllers.

 Then we have contracts as a validation engine, models are split into several parts using [ROM architecture](https://rom-rb.org) which includes *repositories*, *relations*, and *entities*, and the view part is split into three pieces using Dry-View. That includes Views, templates, and parts.

 Aside from that we also have the mailers and the view helpers, however, helpers are nowhere near being globally accessible and you get **full control over what you include in which place**.

Let's then take a closer look into differences and try to map those components to each other.

#### Controllers and actions

Controllers and actions are pretty easy to understand, as they really do play the same role in both frameworks.

In Rails each controller has multiple actions defined as methods, in Hanami, you don't have controllers, because each action is self-contained and has its own class and file.

In Rails controllers, the action renders the template directly, while in Hanami it just calls the proper view.


#### Views

This moves our attention to the view rendering. In [Hanami episode #2](/episodes/2-listing-articles-with-hanami-view) I already dag into the view rendering and have shown how to render articles for a blog - feel free to check it out if you're interested in implementation details.

In Rails, you only have templates that are named views. They're supposed to only be used to present the injected data in an HTML file, but because there is no clear place to put view logic, we often end up with logic being placed in views or controllers.

There is no presentation pattern built-in, so it also tends to be placed in templates directly, or in global helpers.

Then template structures the HTML document to show the data in the browser, and use helpers whenever the view-related logic is used in several places.

Hanami team just said, it's too much for a single object, and they'd split the templates into three parts.

In Hanami you'll then have a view object, that is a ruby file, which contains the view-related logic, uses the helpers when needed, and renders the proper template with only exposed methods available.

You have templates as in Rails, but with the difference, that they're much more simplified. There is no access to any global method, and the template can only use methods that were exposed by a view.

Then finally, presentation logic had been extracted to Parts, so it's clear where to put presentation-related stuff.

This is more code to be written from the very first endpoint, but it scales way better and this solution can be used in Rails too if you want it.

#### Models

Then let's go on to the models.

In Rails, similar to views, when it comes to models, they tend to have multiple responsibilities, and because of that, it's very easy to blow them up in content.

In standard Rails application, you'll find your models being responsible for validating data, the database communication, the scopes' definition, and also will contain the business logic.

In Hanami, each of those responsibilities is again, extracted away to completely separate objects. This way, we get the contracts to validate the data, repositories delivering an interface to communicate with a database, and relations - where we define our queries. Please notice there is no place for business logic in any of those objects.

Hanami encourages you to come with your own abstractions for modeling your business domain and doesn't force you to change your business implementation to match the database structure.

It seems like a much more scalable approach, you can easily replace or reuse those components, but again, you'll get more code to be written and more files to manage.

I see it as a reasonable trade-off, let me know how do you see it in the comments.

### Scalability with slices

Rails is designed to write medium-sized monolithic applications and its default file structure just does not scale well. At some point, you'll need to extend it but there is no clear way how, so we enter similar issues React applications have, where every project has different structure and patterns applied. And before you'll start yielding to me I am fully aware of the existence of Github, Twitter, Shopify, and different other Rails giants. I am not saying it's not possible to scale Rails applications - of course, it is. Rails by default just generate some problems with scaling that are sometimes tricky to be avoided.

To split Rails into several pieces, the only official way is to extract some code from Rails Engines. While this is fine, from my experience extracting anything existing in the main application into an engine is never an easy task.

Hanami also evangelizes the Monolith-First approach and it also comes with everything needed for a complete web application by default, however it is designed in the mindset of scaling well from start.

In Hanami, you'll organize your app around slices since day one. You may think about them as Rails Engines, but not as an option when the app extends, but enabled immediately and used by default.

Whenever then comes a need to extract a part of the application into a separate service, it's way easier, as you already have encapsulated slices, that can be easily removed from the main repository, and put somewhere else.

### Summary

I hope you've enjoyed this episode, and if you want to see more content in this fashion,** Subscribe to [this YT channel](https://www.youtube.com/channel/UC4Z5nwSfZrUO4NI_n9SY3uQ)** and **follow me [on twitter](https://twitter.com/hanamimastery)**!

I'd like to especially thank [Useo](https://useo.pl) and, [Thomas Carr](https://github.com/htcarr3), and Vitalij Pokrityuk for supporting this channel and the Hanami Mastery initiative. I appreciate that as without your financial support this project could not exist.

Also thanks to [Israel Palacio](https://unsplash.com/@othentikisra)- for a great cover image!

Thanks to all of you for being a part of the great Ruby community and for all the positive reactions you give. You're awesome! You can also see two of my previous videos here, and if you have any suggestions of amazing ruby gems You'd like me to cover, or ideas on how to improve, please mention them in the comments!

Have a nice day and see you in the next hanami Mastery episode.