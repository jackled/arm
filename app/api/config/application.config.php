<?php
$config = array(
    'features' => array(
        'get' => array(
            'name' => 'Get',
            'description' => 'Get method is used to read collections or individual elements.  '
			. 'NOTE: In this example GET service call is not access restricted.'
        ),
        'put' => array(
            'name' => 'Put',
            'description' => 'Put method is used to update an element.'
        ),
        'post' => array(
            'name' => 'Post',
            'description' => 'Post method is used to create a new element.  It can also be used to update existing elements for sensitive data.'
        ),
        'delete' => array(
            'name' => 'Delete',
            'description' => 'Delete method is used to delete an element.  '  
			. 'NOTE: In this example Delete service call is returns a number of rows in vip.identity database table.',
			'count' => 0
        ),
    )
);
