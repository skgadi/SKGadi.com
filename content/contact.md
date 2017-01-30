+++
#SEO Data
Keywords = ["contact"]
description = "Send an email to Suresh Kumar Gadi."
date = "2017-01-07T00:00:00-06:00"
title = "Contact"

+++
# Send an email
<form name="contact" netlify netlify-honeypot="bot-field">
	<input name="name" placeholder= "Your name" style= "width: 100%;" tabindex="1"><br/><br/>
	<input name="email" placeholder= "Your email" style= "width: 100%;" tabindex="2"><br/><br/>
	<input name="phone" placeholder= "Your phone number" style= "width: 100%;" tabindex="3"><br/><br/>
	<textarea name="message" placeholder="Your message" style= "width: 100%; height: 145px; border: 1px solid black;" tabindex="4"></textarea><br/>
	<button style="border-style: solid; border-width: 1px; background-color: white; cursor: pointer; color: black; border-color: black; width: 100%" tabindex="5">Send</button>
</form>
# Map
<div style="width: 100%;">
			<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3027.4749267833777!2d-103.33085525628194!3d25.528557890710097!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x25576067121ec28f!2sFIME!5e0!3m2!1sen!2smx!4v1485811391184" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
</div>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script>
	tinymce.init({
	selector:\`textarea\`,
	height: 150,
	menubar: false,
	plugins: [
		\`advlist autolink lists link image charmap print preview anchor\`,
		\`searchreplace visualblocks code fullscreen\`,
		\`insertdatetime media table contextmenu paste code\`
	],
	toolbar: \`undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link \`,
	});
</script>