/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		
		
		jQuery('#login-form input.submit').click(this.fm_check_user);
		jQuery('#value').val(window.location.href );
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	
	
	
	fm_check_user:function(event){
		
		event.preventDefault();
		
		jQuery.ajax({
			type: "POST",
			url: "http://10.0.2.2/findme-wp/wp-admin/admin-ajax.php", // our PHP handler file
			data: {
				action: "fm_check_user",
				login: jQuery('#login-form input[name="login"]').val(),
				passwd: jQuery('#login-form input[name="passwd"]').val()				
			},
			success:function(results){
				jQuery('#value').val(results);
				console.log(results);
			},
			error:function(results){
				jQuery('#value').val(results);
				console.log(results);
			}
		});
		
		
		
	}
	
};

app.initialize();