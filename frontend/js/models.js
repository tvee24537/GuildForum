class Idea {
    constructor(attributes) {
      let whitelist = ["id", "name", "active"]
      whitelist.forEach(attr => this[attr] = attributes[attr]) /*pull attr from new object that used for new idea*/
    }
    /*
    Idea.container() returns a reference to this DOM node:
    <section id="ideasContainer" class="px-4 bg-blue-100 min-h-screen rounded-md shadow">
      <h1 class="text-2xl semibold border-b-4 border-blue">Todo Lists</h1>
      <ul id="lists" class="list-none">
  
      </ul>
    </section>
    */
    static container() {
      return this.c ||= document.querySelector("#ideasContainer") //'this' is calling the class itself
    }
    /*
    Idea.list() returns a reference to this DOM node:
    <ul id="lists" class="list-none">
  
    </ul>
    */
    static list() {
      return this.l ||= document.querySelector('#lists') //'this' is calling the class itself
    }
    
    // Idea.all() will return all of the idea objects that we get from fetching to /ideas.
    static all() {
        return fetch("http://localhost:3000/ideas", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json() // return a promise of body content parsed as JSON
                } else {
                    return res.text().then(errro => Promise.reject(error)) // return a reject promise so we skip the then and go to catch
                }
            })
            .then(ideaArray => {
                
            })
    }
    /*
    <div
    */
    render() {
  
    }
  }
  
  class Comment {
    constructor(attributes) {
      let whitelist = ["id", "name", "idea_id"]
      whitelist.forEach(attr => this[attr] = attributes[attr])
    }
  
    static container() {
      return this.c ||= document.querySelector("#comments")
    }
  }