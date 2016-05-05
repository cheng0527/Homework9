 $(function () {
    	 $.getJSON("todos.json.OLD", function (toDoObjects) {
    		 main(toDoObjects);
    	 });
    	
    	 var main = function (toDoObjects) {
    		 var  toDos = toDoObjects.map(function (toDo) {
    	          // we'll just return the description
    	          // of this toDoObject
    	          return toDo.description;
    	     });
    		 
    		 var initArr =[
                      	    {conn:"Get Groceries"},
                      	    {conn:"Make up some new ToDos"},                            
                      	    {conn:"Prep for Monday's class"},
                      	    {conn:"Answer recruiter emails on LinkedIn"},
                      	    {conn:"Take Gracie to the park"},
                      	    {conn:"Finish writing book"}
             ];
    		 
    		 function create(type,self){
    			 $("main .content .tags").empty();
				 $("main .content .add").empty();
    			 if(type=='Oldest'){
    				  toDos.forEach(function (todo) {
    					  self.cons.push(new Connent(todo));
    	               });
    			 }else if(type=='Newest'){
    				  for (i = toDos.length-1; i >= 0; i--) {
    					  self.cons.push(new Connent(toDos[i]));
    	              }
    			 }else if(type=='Tags'){
    				 var tags = [];
   	                 toDoObjects.forEach(function (toDo) {
   	                    toDo.tags.forEach(function (tag) {
   	                        if (tags.indexOf(tag) === -1) {
   	                            tags.push(tag);
   	                        }
   	                    });
   	                 });
   	                 console.log(tags);

   	                 var tagObjects = tags.map(function (tag) {
   	                    var toDosWithTag = [];
   	                    toDoObjects.forEach(function (toDo) {
   	                        if (toDo.tags.indexOf(tag) !== -1) {
   	                            toDosWithTag.push(toDo.description);
   	                        }
   	                    });

   	                    return { "name": tag, "toDos": toDosWithTag };
   	                 });
   	                 console.log(tagObjects);
   	                 
   	                 tagObjects.forEach(function (tag) {
                       var $tagName = $("<h3>").text(tag.name),
                          $content = $("<ul>");


                       tag.toDos.forEach(function (description) {
                          var $li = $("<li>").text(description);
                          $content.append($li);
                       });
                    
                       $("main .content .tags").append($tagName);
                       $("main .content .tags").append($content);
                    });
    			 }else if(type=='Add'){
    				    var $input = $("<input>").addClass("description"),
                        $inputLabel = $("<p>").text("Description: "),
                        $tagInput = $("<input>").addClass("tags"),
                        $tagLabel = $("<p>").text("Tags: "),
                        $button = $("<span>").text("+");

                        $button.on("click", function () {
                            var description = $input.val(),
                            tags = $tagInput.val().split(","),
                            newToDo = {"description":description, "tags":tags};

                            $.post("todos", newToDo, function (result) {
                            console.log(result);

                            //toDoObjects.push(newToDo);
                            toDoObjects = result;

                            // update toDos
                            toDos = toDoObjects.map(function (toDo) {
                                return toDo.description;
                            });

                            $input.val("");
                            $tagInput.val("");
                        });
                        });

                        $content = $("<div>").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
                        $("main .content .add").append($content);
    			 }
    		 };
    		 
    	    		 
    		 function Connent(conn){
    			 var self = this;
               	 self.conn =ko.observable(conn);
    		 };
    		 
    		 function ViewModel(items){
            	 var self = this;
            	 self.folders=["Newest","Oldest","Tags","Add",]
            	 self.chosenFolderId = ko.observable();
               	 
            	 self.chosenFolderId("Newest");
               	 self.cons = ko.observableArray(items);
               	 
               	 self.show= function(type){
               		self.chosenFolderId(type);
             	    self.cons.removeAll();
             		create(type,self);
               	 }
             }
             ko.applyBindings(new ViewModel(initArr));
    	 }
 });