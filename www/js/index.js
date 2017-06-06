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
		jQuery('#error-box .error-content .close').click(fm_hide_error);
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
			url: connect + "/wp-admin/admin-ajax.php", // our PHP handler file
			data: {
				action: "fm_check_user",
				login: jQuery('#login-form input[name="login"]').val(),
				passwd: jQuery('#login-form input[name="passwd"]').val()				
			},
			success:function(results){
				
				if(parseInt(results) == 0){
					fm_show_error('Nieprawidłowy login lub hasło!', 'OK');
				}else{
					jQuery('#value').val(results);
				}				
				
			},
			error:function(results){
				fm_show_error('Brak połączenia z serwisem.', 'OK');
			}
		});
		
		
		
	},
		
	
};

app.initialize();



	
function fm_show_error(message, buttonVal){
	jQuery('#error-box .error-content p').text(message);
	jQuery('#error-box .close').text(buttonVal);
	jQuery('#error-box').addClass('visible');
}	
	
function fm_hide_error(){
	jQuery('#error-box').removeClass('visible');
	setTimeout(function(){		
		jQuery('#error-box .close').text('');
		jQuery('#error-box .error-content p').text('');
	}, 700);
}