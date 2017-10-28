var data = {"dm9-test": {
	"name": "dm9-test",
	"id": "dm9-test",
	"items": [
		{
			"name": "My Item!",
			"id": "my-item",
			"items": [
				{
					"name": "Le Item",
					"id": "le_item",
					"items": []
				},
				{
					"name": "Le Item 2",
					"id": "le_item_2",
					"items": []
				},
				{
					"name": "Le Item 3",
					"id": "le_item_3",
					"items": []
				}
			],
		},
		{
			"name": "My Item 2!",
			"id": "my-item-2",
			"items": [],
		}
	]
}}

var express = require('express');
var app = express();

app.use('/', express.static('static'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', function (req, res) {
	res.render('index.html');
})

app.get('*', function(req, res) {
	var sections = req.path.substring(1).split("/")
	if (! data[sections[0]])
		data[sections[0]] = {"name": sections[0], "id": sections[0], "items": []};
	var current = data[sections[0]];
	var current_secs = [sections[0]];
	for (let i = 1; i < sections.length; i++)
	{
		var section = sections[i];
		current = get_item(current, section);

		if (! current || current.items.length < 1)
		{
			res.redirect("/" + current_secs.join("/"));
			return;
		}

		current_secs.push(section);
	}

	items = [];

	for (it of current.items)
	{
		items.push({
			"name": it.name,
			"id": it.id,
			"isList": it.items.length > 0 
		})
	}

	res.render("list-item.html", {"name": current.name, "items": items, "hasBack": current_secs.length > 1});
});

app.listen(process.env.PORT || 5000, function () {
	console.log('App listening!');
})

function get_item(list, id)
{
	for (var it of list.items)
	{
		if (it.id == id)
			return it;
	}

	return null;
}