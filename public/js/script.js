
var URL = 'http://localhost:3000';


function getProducts() {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: URL + '/products',
        success: function(data) {
            $('.products tbody tr').remove();
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
    });
}