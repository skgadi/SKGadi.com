+++
#SEO Data
Keywords = ["research", "publications", "articles", "conference"]
description = "Suresh Kumar Gadi has contributions in 1 journal article and 5 conference proceedings."
date = "1999-06-01T00:00:00+05:30"
title = "Research"

+++
<h1 class="header">Publications</h1>

<div class="container-fluid">
	<div class="searchbar">
		<div style="float:left;">
			<button type="button" class="btn btn-default" onclick="reset()">Reset</button>
		</div>
		<div style="float:left;">
			<select id="authorselectfirst" class="btn bibtex_search bibtex_author" style="border: 1px solid lightgrey;" extra="first" search="author">
			  <option value="">Search First Author</option>
			</select>
		</div>
		<div style="float:left;">
			<select id="authorselect" class="btn bibtex_search bibtex_author" style="border: 1px solid lightgrey;" search="author">
			  <option value="">Search Author</option>
			</select>
		</div>
		<div style="float:left;">
			<select id="topicselect" class="btn bibtex_search" style="border: 1px solid lightgrey;">
			  <option value="">Search Topic</option>
			  <!-- Add topic values here -->
			  <option value="Example topic">Example Topic</option>
			</select>
		</div>
		<div style="float:left;">
			<input type="text" class="bibtex_search form-control" id="searchbar" placeholder="Search publications">
			<span class="help-block">Example: journal 2015 (finds the intersection of the two terms)</span>
		</div>
	</div>
</div>
<br/><br/><br/>




<div class="bibtex_structure">
  <div class="group year" extra="ASC number">
  	  <!--a href="#top" style="display: inline"><em>(Top of the page)</em></a-->
  	  <div style="padding-bottom:10px;"></div>
  	  <div class="sort journal" extra="DESC string">
      	<div class="templates"></div>
      </div>
  </div>
</div>

<div id="bibtex_display">
  
		<div class="if bibtex_template" style="display: none;">
			<ul><li>
				<a href="#PutHTMLHere" rel="modal:open"><span class="SKGListItem bibtexVar" id="bib+BIBTEXKEY+" extra="BIBTEXKEY" onclick="DisplayItem('BIBD+BIBTEXKEY+')">
					<span class="if title"><span class="title"></span>.</span>
					<span class="if author"><em><span class="author"></span></em>.</span>
					<span class="if edition">Edition: <span class="edition"></span>.</span>
					<span class="if year"><span class="year"></span>.</span>
				</span></a>
				<div style="display: none;" class="bibtexVar" id="BIBD+BIBTEXKEY+" extra="BIBTEXKEY">
			
					<div class="if title" ><h1 style=" font-weight: normal; text-align: center; margin: 0px;"><span class="title"></span></h1></div>
					<br/>
					<div class="if author"><h4 style=" font-weight: normal; text-align: center;  margin: 0px;"><span class="author"></span></h4></div>
					<div class="if organization"><h4 style=" font-weight: normal; text-align: center; margin: 0px;"><em><span class="organization"></span></em></h4></div>
					<div class="if booktitle"><h4 style=" font-weight: normal; text-align: center; margin: 0px;"><em><span class="booktitle"></span></em></h4></div>
					<br/>
					<div class="if abstract"><span style=" font-weight: bold; text-align: center; margin: 0px;">Abstract:&ndash; </span><span class="abstract" style=" font-weight: normal; text-align: justify;"></span></div>
					<br/>
					<b>More information:</b>
					<table class="ContentTable">
						<TR class="if address"><TD>Address</TD><TD><span class="address"></span></TD></TR>
						<TR class="if annote"><TD>Annote</TD><TD><span class="annote"></span></TD></TR>
						<TR class="if chapter"><TD>Chapter</TD><TD><span class="chapter"></span></TD></TR>
						<TR class="if crossref"><TD>Crossref</TD><TD><span class="crossref"></span></TD></TR>
						<TR class="if doi"><TD>DOI</TD><TD><span style="cursor: pointer;" class="doi" onclick="OpenDOI(this);"></span></TD></TR>
						<TR class="if edition"><TD>Edition</TD><TD><span class="edition"></span></TD></TR>
						<TR class="if editor"><TD>Editor</TD><TD><span class="editor"></span></TD></TR>
						<TR class="if howpublished"><TD>How published</TD><TD><span class="howpublished"></span></TD></TR>
						<TR class="if institution"><TD>Institution</TD><TD><span class="institution"></span></TD></TR>
						<TR class="if isbn"><TD>ISBN</TD><TD><span class="isbn"></span></TD></TR>
						<TR class="if journal"><TD>Journal</TD><TD><span class="journal"></span></TD></TR>
						<TR class="if key"><TD>Key</TD><TD><span class="key"></span></TD></TR>
						<TR class="if month"><TD>Month</TD><TD><span class="month"></span></TD></TR>
						<TR class="if note"><TD>Note</TD><TD><span class="note"></span></TD></TR>
						<TR class="if number"><TD>Number</TD><TD><span class="number"></span></TD></TR>
						<TR class="if pages"><TD>Pages</TD><TD><span class="pages"></span></TD></TR>
						<TR class="if publisher"><TD>Publisher</TD><TD><span class="publisher"></span></TD></TR>
						<TR class="if school"><TD>School</TD><TD><span class="school"></span></TD></TR>
						<TR class="if series"><TD>Series</TD><TD><span class="series"></span></TD></TR>
						<TR class="if type"><TD>Type</TD><TD><span class="type"></span></TD></TR>
						<TR class="if url"><TD>URL</TD><TD><span style="cursor: pointer;" class="url" onclick="OpenURL(this);"></span></TD></TR>
						<TR class="if volume"><TD>Volume</TD><TD><span class="volume"></span></TD></TR>
						<TR class="if year"><TD>Year</TD><TD><span class="year"></span></TD></TR>
					</table>
					<br/>
					<div style="position: relative;">
					<pre class = "BibTeXRawCodeBlock" onclick="SelectTheText(this)" ondblclick="CopyTheText(this);"><span class="bibtexraw noread"></span></pre>
					<a style="display: float;position: absolute; bottom: 0px; right: 5px; font-size: 40px; cursor: pointer;" onclick="CopyThePrevText(this)">&#x2398;</a>
					</div>
					<p>Search this material in your cloud storage:</p>
					<img  style="cursor: pointer; height: 50px;" class="bibtexVar" onclick="OpenFile('+BIBTEXKEY+',1)" extra="BIBTEXKEY" src="images/logo-mega.png"></img>
					<img  style="cursor: pointer; height: 50px;" class="bibtexVar" onclick="OpenFile('+BIBTEXKEY+',2)" extra="BIBTEXKEY" src="images/logo-drive.png"></img>
				</div>
			</li></ul>
		</div>
  
</div>
<div class="modal" id="PutHTMLHere" style= "width: 100%;" >Select an entry to view the complete details here.</div>