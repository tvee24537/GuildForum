class IdeaList {
    constructor(attributes) {
      let whitelist = ["id", "name", "active"]
      whitelist.forEach(attr => this[attr] = attributes[attr]) /*pull attr from new object that used for new idea*/
    }
    /*
    IdeaList.container() returns a reference to this DOM node:
    <section id="ideaListsContainer" class="px-4 bg-blue-100 min-h-screen rounded-md shadow">
      <h1 class="text-2xl semibold border-b-4 border-blue">Todo Lists</h1>
      <ul id="lists" class="list-none">
  
      </ul>
    </section>
    */
    static container() {
      return this.c ||= document.querySelector("#ideaListsContainer") //'this' is calling the class itself
    }
    /*
    IdeaList.list() returns a reference to this DOM node:
    <ul id="lists" class="list-none">
  
    </ul>
    */
    static list() {
      return this.l ||= document.querySelector('#lists') //'this' is calling the class itself
    }
    
    // IdeaList.all() will return all of the idea objects that we get from fetching to /idea_lists.
    static all() {
        return fetch("http://localhost:3000/idea_lists", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json() // return a promise of body content parsed as JSON
                } else {
                    return res.text().then(error => Promise.reject(error)) // return a reject promise so we skip the then and go to catch
                }
            })
            .then(ideaListArray => {
                this.collection = ideaListArray.map(attrs => new IdeaList(attrs))
                let renderedLists = this.collection.map(ideaList => ideaList.render())
                this.container().append(...renderedLists);
                return this.collection
            })
    }
    /*
    TodoList.findById(id) will return the TodoList object that matches the id passed as an argument.
    We'll assume here that this.collection exists because we won't be calling this method until the DOM 
    we've clicked on an element created by one of our TodoList instances that we created and stored in 
    this.collection when the initial fetch has completed and promise callbacks have been executed.
    We're using == instead of === here so we can take advantage of type coercion 
    (the dataset property on the target element will be a string, whereas the id of the TodoList will be an integer)
    */
    static findById(id) {
        return this.collection.find(ideaList => ideaList.id == id)
    }

    static create(formData) {
        return fetch("http://localhost:3000/idea_lists", {
            method: 'POST', //default is get
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idea_list: formData}) // make object a string
        })
        .then(res => {
            if(res.ok) {
                return res.json() // return a promise of body content parsed as JSON
            } else {
                return res.text().then(error => Promise.reject(error)) // return a reject promise so we skip the then and go to catch
            }
        })
        .then(ideaListAttributes => {
            let ideaList = new IdeaList(ideaListAttributes);
            this.collection.push(ideaList);
            this.container().appendChild(ideaList.render()) // appendchild only append one node and only node objects
            new FlashMessage({type: 'success', message: 'New Idea added successfully' })
            return ideaList;
        })
        .catch(error => {
            new FlashMessage({type: 'error', message: error});
        })
    }
    /*
    ideaList.show() => {
        fetch idea_list:id route to get idealist and its associated comments
        use respond to create comment instances client side by invoking Comment.loadByList(id, commentsAttributes)
        take previous selected active ideaList and mark active: false
        mark shown ideaList as active: true so it's shown in darker bg
    }
    */
    show() {
        return fetch(`http://localhost:3000/idea_lists/${this.id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json() // return a promise of body content parsed as JSON
            } else {
                return res.text().then(error => Promise.reject(error)) // return a reject promise so we skip the then and go to catch
            }
        })
        .then(({id, commentsAttributes}) => {  //pull id and comment attributes keys and assign to variable for use later
            console.log('inside callback')
            Comment.loadByList(id, commentsAttributes) // load up comment
            this.markActive()
        })
        .catch(err => {
            return res.test().then(error => Promise.reject(err))
        })
    }
    /*
    ideaList.markActive() set active property on previous active list to false and call render on it to update it's bg color
    Then set current idealist to be IdeaList.activeList and sets active prop to true and render on a darker bg color.
    */
   markActive() {
       if(IdeaList.activeList) {
        IdeaList.activeList.active = false;
        IdeaList.activeList.element.classList.replace('bg-green-400', 'bg-green-200');

       }
       IdeaList.activeList = this;
       this.active = true;
       this.element.classList.replace('bg-green-200', 'bg-green-400');
   }
    /*
    ideaList.render() will create li element and assign it to this.element which will fill element with content like below:
    <li class="my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6">
          <a href="#" class="py-4 col-span-10 sm:col-span-4">My List</a>
          <a href="#" class="my-4 text-right"><i class="fa fa-pencil-alt"></i></a>
          <a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a>
    </li>
    */
    render() {
        this.element ||= document.createElement('li');
        this.element.classList.add(...`my-2 px-4 'bg-green-200' grid grid-cols-12 sm:grid-cols-6`.split(" "));
        
        this.nameLink ||= document.createElement('a');
        this.nameLink.classList.add(..."py-4 col-span-10 sm:col-span-4 selectIdeaList".split(""));
        this.nameLink.textContent = this.name
        this.nameLink.dataset.ideaListId = this.id;

        this.editLink ||= document.createElement('a');
        this.editLink.classList.add(..."my-4 text-right".split(" "));
        this.editLink.innerHTML = '<i class="fa fa-trash-alt"></i>';

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.classList.add(..."my-4 text-right".split(" "));
        this.deleteLink.innerHTML = '<i class="fa fa-trash-alt"></i>';

        this.element.append(this.nameLink, this.editLink, this.deleteLink);

        return this.element;
    }
  }
  
  class Comment {
    constructor(attributes) {
      let whitelist = ["id", "name", "idea_list_id"]
      whitelist.forEach(attr => this[attr] = attributes[attr])
    }
  
    static container() {
      return this.c ||= document.querySelector("#comments")
    }

    static collection() {
        return this.coll ||= {};
    }
    /*
    static loadByList(id, commentsAttributes) =>
    create comment instances using commentsAttributes and call render on each of the instances to build associated DOM node
    clear out container() contents, append the rendered instances to container
    mark id as active_idea_list_id (for new comment submission later)
    */
   static loadByList(id, commentsAttributes) {
       Comment.active_idea_list_id = id;
       let comments = commentsAttributes.map(commentsAttributes => new Comment(commentsAttributes));
       this.collection()[id] = comments;
       let rendered = comments.map(comment => comment.render())
       this.container().innerHTML = "";
       this.container().append(...rendered)
   }
   /*
    Comment.create(formData) => 
    make fetch request using form data and active_idea_list_id to create a new comment instance
    if response is ok, parse it as JSON and return it
    we'll use data we parsed to create a new comment instance, store it render it and add it to DOM at container()
    if response is not ok, return a rejected promise for error and catch it with callback which will display it in FlashMessage.
   */
   static create(formData) {
       if(!Comment.active_idea_list_id) {
           return new FlashMessage({type: 'error', message: "Please select an Idea before adding a comment"});
       } else {
           formData.idea_list_id = Comment.active_idea_list_id;
       }
       console.log(formData);
       return fetch('/comments', {
           method: 'POST',
           headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
           },
           body: JSON.stringify({
               comment: formData
           })
       })
   }
   /*
    <li class="my-2 px-4 bg-green-200 grid grid-cols-12">
        <a href="#" class="py-4 col-span-10">My Comment</a>
        <a href="#" class="my-4 text-right"><i class="fa fa-pencil-alt"></i></a>
        <a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a>
    </li>
    */
   render() {
       this.element ||= document.createElement('li');
       this.element.classList.add(..."my-2 px-4 bg-green-200 grid grid-cols-12".split(" "));
    /*
       this.markCompleteLink ||= document.createElement('a');
       this.markCompleteLink.classList.add(..."my-4 text-center".split(" "));
       this.markCompleteLink.innerHTML = `<i class="p-4 far fa-circle"></i>`;
    */
       this.nameSpan ||= document.createElement('span');
       this.nameSpan.classList.add(..."py-4 col-span-9".split(" "));
       this.nameSpan.textContent = this.name;

       this.editLink ||= document.createElement('a');
       this.editLink.classList.add(..."my-1 text-right".split(" "));
       this.editLink.innerHTML = '<i class="p-4 fa fa-trash-alt"></i>';

       this.deleteLink ||= document.createElement('a');
       this.deleteLink.classList.add(..."my-1 text-right".split(" "));
       this.deleteLink.innerHTML = '<i class="p-4 fa fa-trash-alt"></i>';

       this.element.append(/*this.markCompleteLink, */ this.nameSpan, this.editLink, this.deleteLink);
       return this.element;
   }
  }

 class FlashMessage { // flash message red if error, blue if not
    constructor({type, message}) {
        this.message = message;
        this.color = type == "error" ? 'bg-red-200' :'bg-blue-100';
        this.render();
    }

    static container() {
        return this.c ||= document.querySelector('#flash')
    }

    
    render() { // put message in display
        this.toggleMessage();
        window.setTimeout(() => this.toggleMessage(), 5000);

    }
    toggleMessage() {
        console.log(this);
        FlashMessage.container().textContent = this.message;
        FlashMessage.container().classList.toggle(this.color);
        FlashMessage.container().classList.toggle('opacity-0');
    }
}