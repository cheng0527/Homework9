function Comment(content){
   	 var self = this;
   	 self.content =ko.observable(content);
    }
    function ViewModel(){
   	 var self = this;
   	 self.comms = ko.observableArray();
    }
    $(function () {
   	  var vm = new ViewModel(); 
	  vm.comms.push(new Comment("This is the first comment!"));
	  vm.comms.push(new Comment("Here's the second one!"));
	  vm.comms.push(new Comment("And this is one more."));
	  vm.comms.push(new Comment("Here is another one!"));
	  $("#btnAddComm").click(function(){
		  if($("#comm").val() !== ""){
			  vm.comms.push(new Comment($("#comm").val()));
			  $("#comm").val("");
		  }
	  });
	  ko.applyBindings(vm);
});