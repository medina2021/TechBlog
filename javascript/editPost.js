// Function to edit a post

async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = doument.querySelector('input[name="content"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const response = await fetch(`/api/posts/${id}`,{


    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }else {
        alert(response.statusText);
    }
}
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);