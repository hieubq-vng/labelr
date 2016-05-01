# labelr

# html template


Layout:

```
<div>
	<nav className='top-nav tao-nav-light cf' role='navigation'>
		<input type='checkbox' id='menu-toggle' className='menu-toggle'>
		<label for='menu-toggle'>Menu</label>
		<ul class='list-unstyled list-inline cf'>
			<li>Labelr</li>
			<li><a href='/repos'>Repos</a></li>
			<li className='pull-right'><a href='/logout'>Logout</a></li>
		</ul>
	</nav>
	<div className='container'>
	</div>
</div>
```


Public Page:

```
<div className='container'>
	<header role='banner'>
		<h1>Labelr</h1>
	</header>
	<div>
		<p>We label stuff for you, because, we can&trade;</p>
		<a href="/login" className='button button-large'>
			<span className='mega-oction octicon-mark-github'></span>
			Login with Github
		</a>
	</div>
</div>

```

Repos Page:

```
<div className='container'>
	<h1>Repos</h1>
</div>

```


