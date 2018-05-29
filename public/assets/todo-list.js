$(document).ready(function() {

    $('form').on('submit', function() {

        let item = $('form input')
        let todo = {item: item.val()}

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data) {
          //do something with the data via front-end framework
                location.reload()
            }
        })

        return false

    })

    $('li').on('click', function() {
        let item = $(this).text().replace(/ /g, '-')		// replace any spaces in the item with hyphens as the url can't take spaces.
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data) {
          //do something with the data via front-end framework
                location.reload()
            }
        })
    })

})
