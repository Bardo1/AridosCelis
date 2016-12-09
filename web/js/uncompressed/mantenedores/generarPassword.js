	/*************************************************************************************************
	Random Password Generator by NeoEGM
	 
	Copyright (C) 2009 Ezequiel Gastón Miravalles
	 
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	 
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	 
	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	*************************************************************************************************/
	/*************************************************************************************************
	Software: Random Password Generator by NeoEGM
	Author: Ezequiel Gastón Miravalles
	Website: http://www.neoegm.com/software/random-password-generator/
	License: GNU GPL v3 (read above)
	*************************************************************************************************/
	function GenerarPassword(Length, Upper, Numbers, Lower) {
	    Upper = typeof(Upper) != 'undefined' ? Upper : true;
	    Numbers = typeof(Numbers) != 'undefined' ? Numbers : true;
	    Lower = typeof(Lower) != 'undefined' ? Lower : true;
	     
	    if (!Upper && !Lower && !Numbers)
	        return "";
	 
	    var Ret = Math.floor((Math.random()*9)+1) + "";
	    var Num;
	    var Repeat;

	    Chars = 26 * 2 + 10;    //26 (a-z) + 26 (A-Z) + 10 (0-9)
	    //a-z = 97-122
	    //A-Z = 65-90
	    //0-9 = 48-57
	 
	    for (i = 1; i <= Length; i++) {
	        Repeat = false;
	        Num = Math.floor(Math.random()*Chars);
	        if (Num < 26)
	            if (Lower)
	                Ret = Ret + String.fromCharCode(Num + 97);
	            else
	                Repeat = true;
	        else if (Num < 52)
	            if (Upper)
	                Ret = Ret + String.fromCharCode(Num - 26 + 65);
	            else
	                Repeat = true;
	        else if (Num < 62)
	            if (Numbers)
	                Ret = Ret + String.fromCharCode(Num - 52 + 48);
	            else
	                Repeat = true;
	        if (Repeat)
	            i--;
	    }
	    return Ret;
	}