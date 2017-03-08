import './homeGallery.html';

Template.homeGallery.onRendered(function() {
	var self = this;
	self.autorun(function(){
		blueimp.Gallery(
		    document.getElementById('links').getElementsByTagName('a'),
		    {
		        container: '#blueimp-gallery-carousel',
		        carousel: true
		    }
		);		
	});
});