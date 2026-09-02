---
title: Backend
description: The application tier — where requests turn into logic, data and work.
order: 2
areas:
  - title: Application layer
    description: Handling requests, business logic and talking to data stores.
  - title: Concurrency
    description: Serving many requests at once without corrupting shared state.
  - title: Scaling & routing
    description: Load balancing and statelessness that let you add machines.
status: stable
---

The backend is where incoming requests become behaviour: running logic, reading
and writing data, coordinating concurrent work, and returning a response.

It sits at the centre of the [Systems Map](/systems-map), between the network
edge and the data tier, and is usually the first place complexity accumulates.
