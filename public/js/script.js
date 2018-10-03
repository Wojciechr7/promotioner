
var URL = 'https://scrap-api.herokuapp.com';


function getProducts() {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: URL + '/products',
        success: function(data) {
            $('.products tbody tr').remove();
            console.log(data);
            displayPromotions(data);

        }
    });
}

function saveProducts() {

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: URL + '/products',
        success: function(data) {
            console.log(data);
            if (!isNaN(data)) {
                alert(`please wait ${data} minutes`);
            } else {
                displayPromotions(data);
            }

        }
    });

}


function displayPromotions(data) {
    data.forEach(el => {
        $('.products tbody').append(
            '<tr>\n' +
            '            <td>' + el.id + '</td>\n' +
            '            <td>' + el.name + '</td>\n' +
            '            <td>' + el.pln + '</td>\n' +
            '            <td>' + el.gr + '</td>\n' +
            '            <td>' + el.promotion + '</td>\n' +
            '            <td>' + el.shop + '</td>\n' +
            '        </tr>');

    })
}