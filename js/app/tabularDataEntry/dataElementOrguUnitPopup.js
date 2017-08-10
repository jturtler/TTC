
function DataElementOrguUnitPopup( _TabularDEObj )
{
	var me = this;
	me.TabularDEObj = _TabularDEObj;
	
	me.inputCodeTag;
	me.inputGPSTag;
	
	me.PARAM_ORGUNITID = "@PARAM_ORGUNITID";
	me._queryURL_orgUnit_L5 = _queryURL_api + "organisationUnits/" + me.PARAM_ORGUNITID + ".json?fields=id,name,code,level&includeDescendants=true&filter=level:eq:5";
		
	me.dialogFormTag = $("#orgUnit_DataElementForm");
	
	me.deOrgUnitSelectorOptionTag = $("[name='deOrgUnitSelectorOption']");
	me.villageByHeathCenterOptionTag = $("[name='deOrgUnitSelectorOption'][value='villageByHeathCenter']");
	me.villageByOULevelTag = $("[name='deOrgUnitSelectorOption'][value='villageByOULevel']");
			
			
	me.villageByOULevelSelectorOptionTag = $("#villageByOULevelSelectorOption");
	me.villageByHeathCenterTbTag = $("#villageByHeathCenterTb");
	me.villageByOULevelTbTag = $("#villageByOULevelTb");
	
	me.deOrgunitListTag = $("#deOrgunitList");
	me.deProvinceListTag = $("#deProvinceList");
	me.deDistritListTag = $("#deDistritList");
	me.deCommuneListTag = $("#deCommuneList");
	me.deVillageListTag = $("#deVillageList");
						
						
	
	me.provinceHierarchy = 
		[
			 {
				"code": "01"
				,"name": "Banteay Meanchey"
				,"districts":[
					{
						"code":"102"
						,"name": "Mongkol Borei"
						,"communes": [						
							{
								"code": "10201" 
								,"name": "Banteay Neang"
								,"villages": [
									 {"code": "VL102010300" ,"name": "Banteay Neang" ,"lat": "13.512133" ,"lng": "13.512133"}
									,{"code": "VL102010400" ,"name": "Kouk Pnov" ,"lat": "13.50483" ,"lng": "13.50483"}
									,{"code": "VL102010500" ,"name": "Trang" ,"lat": "13.51026" ,"lng": "13.51026"}
									,{"code": "VL102010600" ,"name": "Pongro" ,"lat": "13.501803" ,"lng": "13.501803"}
									,{"code": "VL102010700" ,"name": "Kouk Tonloab" ,"lat": "13.489512" ,"lng": "13.489512"}
									,{"code": "VL102010800" ,"name": "Trabaek" ,"lat": "13.490517" ,"lng": "13.490517"}
									,{"code": "VL102010900" ,"name": "Khile" ,"lat": "13.487784" ,"lng": "13.487784"}
									,{"code": "VL102011000" ,"name": "Samraong Pen" ,"lat": "13.492361" ,"lng": "13.492361"}
									,{"code": "VL102011100" ,"name": "Dang Run Lech" ,"lat": "13.493706" ,"lng": "13.493706"}
									,{"code": "VL102011200" ,"name": "Dang Run Kaeut" ,"lat": "13.497877" ,"lng": "13.497877"}
									,{"code": "VL102011300" ,"name": "Ou Snguot" ,"lat": "13.466934" ,"lng": "13.466934"}
									,{"code": "VL102011400" ,"name": "Prey Changha Lech" ,"lat": "13.467601" ,"lng": "13.467601"}
									,{"code": "VL102011500" ,"name": "Prey Changha Kaeut" ,"lat": "13.467841" ,"lng": "13.467841"}
									,{"code": "VL102011600" ,"name": "Ou Andoung Lech" ,"lat": "13.468161" ,"lng": "13.468161"}
									,{"code": "VL102011700" ,"name": "Ou Andoung Kandal" ,"lat": "13.466345" ,"lng": "13.466345"}
									,{"code": "VL102011800" ,"name": "Ou Andoung Kaeut" ,"lat": "13.469237" ,"lng": "13.469237"}
									,{"code": "VL102011900" ,"name": "Kouk Kduoch" ,"lat": "13.47098" ,"lng": "13.47098"}
								] 
							}
							,{
								"code": "10202" 
								,"name": "Bat Trang"
								,"villages":[
									 {"code": "VL102020100" ,"name":  "Khtum Reay Lech" ,"lat":  "13.505579" ,"lng":  "102.98944"}	
									,{"code": "VL102020200" ,"name":  "Khtum Reay Kaeut" ,"lat":  "13.502946" ,"lng":  "102.990228"}	
									,{"code": "VL102020300" ,"name":  "Anlong Thngan Kaeut" ,"lat":  "13.513705" ,"lng":  "102.988448"}	
									,{"code": "VL102020400" ,"name":  "Anlong Thngan Lech" ,"lat":  "13.514593" ,"lng":  "102.986593"}	
									,{"code": "VL102020500" ,"name":  "Bang Bat Lech" ,"lat":  "13.524564" ,"lng":  "102.990204"}	
									,{"code": "VL102020600" ,"name":  "Bang Bat Kaeut" ,"lat":  "13.524578" ,"lng":  "102.992051"}	
									,{"code": "VL102020700" ,"name":  "Bat Trang" ,"lat":  "13.532704" ,"lng":  "102.991059"}	
									,{"code": "VL102020800" ,"name":  "Bat Trang Thum Lech" ,"lat":  "13.535378" ,"lng":  "102.986419"}	
									,{"code": "VL102020900" ,"name":  "Bat Trang Thum Kaeut" ,"lat":  "13.536304" ,"lng":  "102.989182"}	
									,{"code": "VL102021000" ,"name":  "Bang Bat Touch" ,"lat":  "13.543526" ,"lng":  "102.988198"}	
									,{"code": "VL102021100" ,"name":  "Preaek Chik" ,"lat":  "13.550725" ,"lng":  "102.984442"}	
								]
							}
							,{
								"code": "10203" 
								,"name": "Chamnaom"
								,"villages":[
									 {"code": "VL102030100" ,"name":  "Pralay Char" ,"lat":  "13.453207" ,"lng":  "102.955667"}
									,{"code": "VL102030200" ,"name":  "Rongvean Lech" ,"lat":  "13.452771" ,"lng":  "102.944333"}
									,{"code": "VL102030300" ,"name":  "Rongvean Kaeut" ,"lat":  "13.450554" ,"lng":  "102.960676"}
									,{"code": "VL102030400" ,"name":  "Chamnaom Lech" ,"lat":  "13.448925" ,"lng":  "102.937044"}
									,{"code": "VL102030500" ,"name":  "Chamnaom Kaeut" ,"lat":  "13.443681" ,"lng":  "102.934559"}
									,{"code": "VL102030600" ,"name":  "Roung Kou Daeum" ,"lat":  "13.436429" ,"lng":  "102.931851"}
									,{"code": "VL102030700" ,"name":  "Roung Kou Kandal" ,"lat":  "13.424019" ,"lng":  "102.9615"}
									,{"code": "VL102030800" ,"name":  "Roung Kou Chong" ,"lat":  "13.434622" ,"lng":  "102.931866"}
									,{"code": "VL102030900" ,"name":  "Peam Roung Kou" ,"lat":  "13.431911" ,"lng":  "102.93189"}
									,{"code": "VL102031000" ,"name":  "Ta Sal" ,"lat":  "13.424612" ,"lng":  "102.9345"}
									,{"code": "VL102031100" ,"name":  "Chuor Khchas" ,"lat":  "13.416853" ,"lng":  "102.931603"}
									,{"code": "VL102031200" ,"name":  "Boeng Tras" ,"lat":  "13.413093" ,"lng":  "102.951437"}
									,{"code": "VL102031300" ,"name":  "Dang Trang" ,"lat":  "13.410494" ,"lng":  "102.965307"}
									,{"code": "VL102031400" ,"name":  "Srae Prey" ,"lat":  "13.417834" ,"lng":  "102.979093"}
									,{"code": "VL102031500" ,"name":  "Bos Tonloab" ,"lat":  "13.435826" ,"lng":  "102.968787"}
									,{"code": "VL102031600" ,"name":  "Ta Bun" ,"lat":  "13.423981" ,"lng":  "102.956884"}
									,{"code": "VL102031700" ,"name":  "Kouk Ponley" ,"lat":  "13.441263" ,"lng":  "102.970588"}
									,{"code": "VL102031800" ,"name":  "Say Samaon" ,"lat":  "13.448535" ,"lng":  "102.837841"}
									,{"code": "VL102031900" ,"name":  "Damnak Preah Angk" ,"lat":  "13.477534" ,"lng":  "102.837959"}
								]
							}
							,{
								"code": "10204" 
								,"name": "Kouk Ballangk"
								,"villages":[
									 {"code": "VL102040100" ,"name":  "Kouk Ballangk" ,"lat":  "13.469652" ,"lng":  "103.0814"}
									,{"code": "VL102040200" ,"name":  "Ta An" ,"lat":  "13.471071" ,"lng":  "103.089747"}
									,{"code": "VL102040300" ,"name":  "Pralay Chrey" ,"lat":  "13.471356" ,"lng":  "103.093974"}
									,{"code": "VL102040400" ,"name":  "Cheung Chab" ,"lat":  "13.474276" ,"lng":  "103.099953"}
									,{"code": "VL102040500" ,"name":  "Phat Sandaong" ,"lat":  "13.47333" ,"lng":  "103.105197"}
									,{"code": "VL102040600" ,"name":  "Char Thmei" ,"lat":  "13.474259" ,"lng":  "103.1181"}
									,{"code": "VL102040700" ,"name":  "Ph'av Thmei" ,"lat":  "13.478636" ,"lng":  "103.128188"}
									,{"code": "VL102040800" ,"name":  "Ta Sal" ,"lat":  "13.482668" ,"lng":  "103.158818"}
								]
							}
							,{
								"code": "10205" 
								,"name": "Koy Maeng"
								,"villages":[
									 {"code": "VL102050100" ,"name":  "Koy Maeng" ,"lat":  "13.553402" ,"lng":  "103.095271"}
									,{"code": "VL102050200" ,"name":  "Sdei Leu" ,"lat":  "13.548065" ,"lng":  "103.080413"}
									,{"code": "VL102050300" ,"name":  "Phlov Siem" ,"lat":  "13.551383" ,"lng":  "103.090086"}
									,{"code": "VL102050400" ,"name":  "Ta Nong" ,"lat":  "13.555303" ,"lng":  "103.093334"}
									,{"code": "VL102050500" ,"name":  "Angkar Khmau" ,"lat":  "13.556219" ,"lng":  "103.109106"}
									,{"code": "VL102050600" ,"name":  "Kasang Thmei" ,"lat":  "13.559869" ,"lng":  "103.113696"}
									,{"code": "VL102050700" ,"name":  "Stueng Chas" ,"lat":  "13.554348" ,"lng":  "103.100806"}
									,{"code": "VL102050800" ,"name":  "Sdei Kraom" ,"lat":  "13.549893" ,"lng":  "103.085433"}
								]
							}
							,{
								"code": "10206" 
								,"name": "Ou Prasat"
								,"villages":[
									 {"code": "VL102060100" ,"name":  "Phnum Thum Tboung" ,"lat":  "13.432717" ,"lng":  "103.015189"}
									,{"code": "VL102060200" ,"name":  "Phnum Prasat" ,"lat":  "13.445016" ,"lng":  "103.015088"}
									,{"code": "VL102060300" ,"name":  "Phnum Thum Cheung" ,"lat":  "13.445589" ,"lng":  "103.01331"}
									,{"code": "VL102060400" ,"name":  "Chamkar Louk" ,"lat":  "13.44696" ,"lng":  "103.006069"}
									,{"code": "VL102060500" ,"name":  "Phnum Thum Thmei" ,"lat":  "13.451634" ,"lng":  "103.016649"}
									,{"code": "VL102060600" ,"name":  "Anlong Sdei" ,"lat":  "13.449815" ,"lng":  "103.023146"}
									,{"code": "VL102060700" ,"name":  "Kouk Thnong Kaeut" ,"lat":  "13.448101" ,"lng":  "103.035164"}
									,{"code": "VL102060800" ,"name":  "Kouk Thnong Kandal" ,"lat":  "13.448962" ,"lng":  "103.029617"}
									,{"code": "VL102060900" ,"name":  "Ou Snguot" ,"lat":  "13.465987" ,"lng":  "103.011009"}
									,{"code": "VL102061000" ,"name":  "Ou Prasat" ,"lat":  "13.468602" ,"lng":  "102.998983"}
									,{"code": "VL102061100" ,"name":  "Kouk Ampil" ,"lat":  "13.474681" ,"lng":  "103.005369"}
									,{"code": "VL102061200" ,"name":  "Ra Chamkar Chek" ,"lat":  "13.457149" ,"lng":  "103.010029"}
									,{"code": "VL102061300" ,"name":  "Pou Rieng" ,"lat":  "13.481377" ,"lng":  "103.008721"}
									,{"code": "VL102061400" ,"name":  "Rung Krabau" ,"lat":  "13.489416" ,"lng":  "103.002504"}
								]
							}
							,{
								"code": "10207" 
								,"name": "Phnum Touch"
								,"villages":[
									 {"code": "VL102070100" ,"name":  "Phnum Touch Tboung" ,"lat":  "13.405505" ,"lng":  "103.019816"}
									,{"code": "VL102070200" ,"name":  "Phnum Touch Cheung" ,"lat":  "13.41092" ,"lng":  "103.018849"}
									,{"code": "VL102070300" ,"name":  "Thnal Bat" ,"lat":  "13.426268" ,"lng":  "103.016876"}
									,{"code": "VL102070400" ,"name":  "Ou Nhor" ,"lat":  "13.397379" ,"lng":  "103.020806"}
									,{"code": "VL102070500" ,"name":  "Boeng Tras" ,"lat":  "13.432477" ,"lng":  "103.002053"}
									,{"code": "VL102070600" ,"name":  "Monourom" ,"lat":  "13.412633" ,"lng":  "103.006833"}
									,{"code": "VL102070700" ,"name":  "Paoy Ta Sek" ,"lat":  "13.397714" ,"lng":  "103.038297"}
									,{"code": "VL102070800" ,"name":  "Prey Totueng" ,"lat":  "13.424902" ,"lng":  "103.032832"}
									,{"code": "VL102070900" ,"name":  "Boeng Reang" ,"lat":  "13.407247" ,"lng":  "103.011493"}
									,{"code": "VL102071000" ,"name":  "Voat Thmei" ,"lat":  "13.419039" ,"lng":  "103.016936"}
								]
							}
							,{
								"code": "10208" 
								,"name": "Rohat Tuek"
								,"villages":[
									 {"code": "VL102080100" ,"name":  "Pou Pir Daeum" ,"lat":  "13.495602" ,"lng":  "102.984906"}
									,{"code": "VL102080200" ,"name":  "Rohat Tuek" ,"lat":  "13.486565" ,"lng":  "102.984981"}
									,{"code": "VL102080300" ,"name":  "Thnal Bat" ,"lat":  "13.48204" ,"lng":  "102.985379"}
									,{"code": "VL102080400" ,"name":  "Kramol" ,"lat":  "13.481069" ,"lng":  "102.975793"}
									,{"code": "VL102080500" ,"name":  "Khtum Chrum" ,"lat":  "13.471268" ,"lng":  "102.980843"}
									,{"code": "VL102080600" ,"name":  "Chak Lech" ,"lat":  "13.471905" ,"lng":  "102.960172"}
									,{"code": "VL102080700" ,"name":  "Doun Mul" ,"lat":  "13.466267" ,"lng":  "102.968179"}
									,{"code": "VL102080800" ,"name":  "Preaek Samraong" ,"lat":  "13.462884" ,"lng":  "102.962095"}
									,{"code": "VL102080900" ,"name":  "Ou Dangkao" ,"lat":  "13.456729" ,"lng":  "102.983384"}
									,{"code": "VL102081000" ,"name":  "Chamkar Chek" ,"lat":  "13.454877" ,"lng":  "102.97786"}
									,{"code": "VL102081100" ,"name":  "Ou Chuob" ,"lat":  "13.448552" ,"lng":  "102.977913"}
									,{"code": "VL102081200" ,"name":  "Ka Svay" ,"lat":  "13.43473" ,"lng":  "102.988757"}
									,{"code": "VL102081300" ,"name":  "Chak Kaeut" ,"lat":  "13.472827" ,"lng":  "102.966831"}
								]
							}
							,{
								"code": "10209" 
								,"name": "Ruessei Kraok"
								,"villages":[
									 {"code": "VL102090100" ,"name":  "Anhchanh" ,"lat":  "13.541014" ,"lng":  "103.040639"}
									,{"code": "VL102090200" ,"name":  "Neang Ket" ,"lat":  "13.544563" ,"lng":  "103.004816"}
									,{"code": "VL102090300" ,"name":  "Praek Ropov" ,"lat":  "13.54994" ,"lng":  "102.999228"}
									,{"code": "VL102090400" ,"name":  "Sala Daeng" ,"lat":  "13.548185" ,"lng":  "103.005709"}
									,{"code": "VL102090500" ,"name":  "Samraong" ,"lat":  "13.544746" ,"lng":  "103.027907"}
									,{"code": "VL102090600" ,"name":  "Anlong Mean Troap" ,"lat":  "13.541141" ,"lng":  "103.054632"}
									,{"code": "VL102090700" ,"name":  "Chamkar Ta Daok" ,"lat":  "13.530812" ,"lng":  "103.018951"}
									,{"code": "VL102090800" ,"name":  "Pralay Luong Kraom" ,"lat":  "13.539418" ,"lng":  "103.039959"}
									,{"code": "VL102090900" ,"name":  "Luong" ,"lat":  "13.537545" ,"lng":  "103.031661"}
									,{"code": "VL102091000" ,"name":  "Ou Ta Kol" ,"lat":  "13.541944" ,"lng":  "103.052067"}
									,{"code": "VL102091100" ,"name":  "Pralay Luong Leu" ,"lat":  "13.537834" ,"lng":  "103.034966"}
									,{"code": "VL102091200" ,"name":  "Kouk Svay" ,"lat":  "13.540191" ,"lng":  "103.023326"}
									,{"code": "VL102091300" ,"name":  "Ou Ta Ma" ,"lat":  "13.548232" ,"lng":  "103.071645"}
									,{"code": "VL102091400" ,"name":  "Kaoh Kaev" ,"lat":  "13.544695" ,"lng":  "103.021441"}
									,{"code": "VL102091500" ,"name":  "Phasi Sra" ,"lat":  "13.541584" ,"lng":  "103.03148"}
									,{"code": "VL102091600" ,"name":  "Ruessei Kraok" ,"lat":  "13.542013" ,"lng":  "103.025158"}
									,{"code": "VL102091700" ,"name":  "Chumteav" ,"lat":  "13.525703" ,"lng":  "103.019751"}
								]
							}
							,{
								"code": "10210" 
								,"name": "Sambuor"
								,"villages":[
									 {"code": "VL102100100" ,"name":  "Chhnaeum Meas" ,"lat":  "13.479003" ,"lng":  "103.178055"}
									,{"code": "VL102100200" ,"name":  "Sranal" ,"lat":  "13.476305" ,"lng":  "103.179923"}
									,{"code": "VL102100300" ,"name":  "La" ,"lat":  "13.47362" ,"lng":  "103.183637"}
									,{"code": "VL102100400" ,"name":  "Ta Meaeng Pok" ,"lat":  "13.474564" ,"lng":  "103.189171"}
									,{"code": "VL102100500" ,"name":  "Sambuor" ,"lat":  "13.465593" ,"lng":  "103.198474"}
									,{"code": "VL102100600" ,"name":  "Doun Loek" ,"lat":  "13.454931" ,"lng":  "103.22441"}
									,{"code": "VL102100700" ,"name":  "Kbal Krabei" ,"lat":  "13.451342" ,"lng":  "103.228131"}
									,{"code": "VL102100800" ,"name":  "Srah Chhuk" ,"lat":  "13.452272" ,"lng":  "103.231818"}
									,{"code": "VL102100900" ,"name":  "Srae Prey" ,"lat":  "13.451407" ,"lng":  "103.237365"}
									,{"code": "VL102101000" ,"name":  "Chaek Angkar" ,"lat":  "13.427973" ,"lng":  "103.24677"}
									,{"code": "VL102101100" ,"name":  "Thma Dab" ,"lat":  "13.416159" ,"lng":  "103.237622"}
								]
							}
							,{
								"code": "10211" 
								,"name": "Soea"
								,"villages":[
									 {"code": "VL102110100" ,"name":  "Ta Mau" ,"lat":  "13.370762" ,"lng":  "102.93028"}
									,{"code": "VL102110200" ,"name":  "Ansam Chek" ,"lat":  "13.372233" ,"lng":  "102.927785"}
									,{"code": "VL102110300" ,"name":  "Tnaot" ,"lat":  "13.375953" ,"lng":  "102.93079"}
									,{"code": "VL102110400" ,"name":  "Buor" ,"lat":  "13.383686" ,"lng":  "102.932644"}
									,{"code": "VL102110500" ,"name":  "Bos Laok" ,"lat":  "13.389205" ,"lng":  "102.934563"}
									,{"code": "VL102110600" ,"name":  "Soea" ,"lat":  "13.394831" ,"lng":  "102.928515"}
									,{"code": "VL102110700" ,"name":  "Boeng Touch" ,"lat":  "13.396631" ,"lng":  "102.927576"}
									,{"code": "VL102110800" ,"name":  "Phlov Damrei Leu" ,"lat":  "13.400349" ,"lng":  "102.930212"}
									,{"code": "VL102110900" ,"name":  "Phlov Damrei Kraom" ,"lat":  "13.404807" ,"lng":  "102.932777"}
									,{"code": "VL102111000" ,"name":  "Ou Soea" ,"lat":  "13.401262" ,"lng":  "102.941383"}
									,{"code": "VL102111100" ,"name":  "Kouk Samraong" ,"lat":  "13.382621" ,"lng":  "102.98308"}
									,{"code": "VL102111200" ,"name":  "Ballangk Chrey" ,"lat":  "13.414567" ,"lng":  "102.787928"}
									,{"code": "VL102111300" ,"name":  "Ou Chuob Thmei" ,"lat":  "13.423053" ,"lng":  "102.775674"}
								]
							}
							,{
								"code": "10212" 
								,"name": "Srah Reang"
								,"villages":[
									 {"code":  "102120100" ,"name":  "Ta In Muoy" ,"lat":  "13.502585" ,"lng":  "103.052026"}
									,{"code":  "102120200" ,"name":  "Ta In Pir" ,"lat":  "13.503862" ,"lng":  "103.057003"}
									,{"code":  "102120300" ,"name":  "Krouch" ,"lat":  "13.504582" ,"lng":  "103.060212"}
									,{"code":  "102120400" ,"name":  "Chamkar Chek" ,"lat":  "13.505592" ,"lng":  "103.063427"}
									,{"code":  "102120500" ,"name":  "Srah Reang" ,"lat":  "13.503514" ,"lng":  "103.071654"}
									,{"code":  "102120600" ,"name":  "Ta Chan" ,"lat":  "13.501749" ,"lng":  "103.07721"}
									,{"code":  "102120700" ,"name":  "Kouk Srok" ,"lat":  "13.500902" ,"lng":  "103.084605"}
									,{"code":  "102120800" ,"name":  "Kouk Chrab" ,"lat":  "13.499165" ,"lng":  "103.093855"}
									,{"code":  "102120900" ,"name":  "Kouk Krasang" ,"lat":  "13.501918" ,"lng":  "103.099375"}
								]
							}
							,{
								"code": "10213" 
								,"name": "Ta Lam"
								,"villages":[
									 {"code": "VL102130100" ,"name":  "Preah Srae" ,"lat":  "13.518662" ,"lng":  "103.043823"}
									,{"code": "VL102130200" ,"name":  "Ta Lam Kandal" ,"lat":  "13.519623" ,"lng":  "103.051205"}
									,{"code": "VL102130300" ,"name":  "Ta Lam Chong" ,"lat":  "13.524364" ,"lng":  "103.078673"}
									,{"code": "VL102130400" ,"name":  "Boeng Khleang Lech" ,"lat":  "13.516475" ,"lng":  "103.11219"}
									,{"code": "VL102130500" ,"name":  "Chong Kouk" ,"lat":  "13.521807" ,"lng":  "103.100141"}
									,{"code": "VL102130600" ,"name":  "Boeng Khleang Kaeut" ,"lat":  "13.520146" ,"lng":  "103.119551"}
									,{"code": "VL102130700" ,"name":  "Khla Kham Chhkae" ,"lat":  "13.519233" ,"lng":  "103.141366"}
									,{"code": "VL102130800" ,"name":  "Boeng Veaeng" ,"lat":  "13.496865" ,"lng":  "103.148743"}
								]
							}
						]
					}
					,{
						"code": "103"
						,"name": "Phnum Srok"
						,"communes": [			
						
						]
					}
					,{
						"code": "104"
						,"name": "Preah Netr Preah"
						,"communes": [			
						
						]
					}
					,{
						"code": "105"
						,"name": "Ou Chrov"
						,"communes": [			
						
						]
					}
					,{
						"code": "106"
						,"name": "Serei Saophoan"
						,"communes": [			
						
						]
					}
					,{
						"code": "107"
						,"name": "Thma Puok"
						,"communes": [			
						
						]
					}
					,{
						"code": "108"
						,"name": "Svay Chek"
						,"communes": [			
						
						]
					}
					,{
						"code": "109"
						,"name": "Malai"
						,"communes": [			
						
						]
					}
					,{
						"code": "110"
						,"name": "Krong Paoy Paet"
						,"communes": [			
						
						]
					}
				]
			}
			,{
				"code": "02"
				,"name": "Battambang"
				,"districts":[
					{
						"code":  "201"
						,"name":  "Banan"
						,"communes": [		
							{
								"code": "20101"
								,"name": "Kantueu Muoy"
								,"villages": [
									{"code": "VL201010100","name": "Thmei","lat": "12.875329","lng": "103.145914"}
									,{"code": "VL201010200","name": "Tuol Thnong","lat": "12.886165","lng": "103.146995"}
									,{"code": "VL201010300","name": "Svay Prey","lat": "12.902","lng": "103.148261"}
									,{"code": "VL201010400","name": "Svay Bei Daeum","lat": "12.931105","lng": "103.153547"}
									,{"code": "VL201010500","name": "Kampong Ampil","lat": "12.91392","lng": "103.151831"}
									,{"code": "VL201010600","name": "Sasar Pok","lat": "12.897977","lng": "103.14045"}
									,{"code": "VL201010700","name": "Voat Kantueu","lat": "12.913874","lng": "103.145381"}

								]
							}
							,{
								"code": "20102"
								,"name": "Kantueu Pir"
								,"villages": [
									{"code": "VL201020100","name": "Post Kantueu","lat": "12.915434","lng": "103.112052"}
									,{"code": "VL201020200","name": "Chamkar Ou","lat": "12.930934","lng": "103.129591"}
									,{"code": "VL201020300","name": "Banan","lat": "12.95226","lng": "103.14413"}
									,{"code": "VL201020400","name": "Kampang Lech","lat": "12.941725","lng": "103.147111"}
									,{"code": "VL201020500","name": "Kampang Kaeut","lat": "12.950052","lng": "103.1488"}
									,{"code": "VL201020600","name": "Chhay Rumpoat","lat": "12.936502","lng": "103.149822"}
									,{"code": "VL201020700","name": "Phnom Kol","lat": "12.897435","lng": "103.121548"}

								]
							}
							,{
								"code": "20103"
								,"name": "Bay Damram"
								,"villages": [
									{"code": "VL201030100","name": "Tuol Chranieng","lat": "12.962242","lng": "103.150904"}
									,{"code": "VL201030200","name": "Kampong Chaeng","lat": "12.972666","lng": "103.151398"}
									,{"code": "VL201030300","name": "Kanhchroung","lat": "12.976847","lng": "103.153413"}
									,{"code": "VL201030400","name": "Krala Peas","lat": "12.984853","lng": "103.155566"}
									,{"code": "VL201030500","name": "Bay Damram","lat": "12.990801","lng": "103.159559"}
									,{"code": "VL201030600","name": "Ta Song","lat": "12.991751","lng": "103.166004"}
									,{"code": "VL201030700","name": "Sdau","lat": "12.997193","lng": "103.168729"}
									,{"code": "VL201030800","name": "Prey Totueng","lat": "12.946679","lng": "103.209352"}

								]
							}
							,{
								"code": "20104"
								,"name": "Chheu Teal"
								,"villages": [
								{"code": "VL201040100","name": "Kampong Chamlang","lat": "13.03168","lng": "103.188757"}
,{"code": "VL201040200","name": "Chheu Teal","lat": "13.020956","lng": "103.170122"}
,{"code": "VL201040300","name": "Kampong Srama","lat": "13.014606","lng": "103.159292"}
,{"code": "VL201040400","name": "Khnar","lat": "13.022666","lng": "103.160154"}
,{"code": "VL201040500","name": "Annachet","lat": "13.009656","lng": "103.155908"}
,{"code": "VL201040600","name": "Bat Sala","lat": "13.005317","lng": "103.165951"}
,{"code": "VL201040700","name": "Bay Damram","lat": "13.002747","lng": "103.155351"}
,{"code": "VL201040800","name": "Svay Prakeab","lat": "12.996227","lng": "103.158708"}
,{"code": "VL201040900","name": "Chhak Pou","lat": "12.990867","lng": "103.147227"}
,{"code": "VL201041000","name": "Anlong Ta Mei","lat": "12.983459","lng": "103.143945"}
,{"code": "VL201041100","name": "Chamkar Svay","lat": "12.974448","lng": "103.147698"}
,{"code": "VL201041200","name": "Thkov","lat": "12.971736","lng": "103.147718"}
,{"code": "VL201041300","name": "Braboh","lat": "12.97203","lng": "103.13192"}
,{"code": "VL201041400","name": "Doung","lat": "12.968121","lng": "103.147745"}
,{"code": "VL201041500","name": "Anlok Kaong","lat": "12.959974","lng": "103.145962"}

								]
							}
							,{
								"code": "20105"
								,"name": "Chaeng Mean Chey"
								,"villages": [
									{"code": "VL201050100","name": "Rung","lat": "12.860006","lng": "103.105098"}
,{"code": "VL201050200","name": "Chaeng","lat": "12.872291","lng": "103.099045"}
,{"code": "VL201050300","name": "Kampong Kol Tmei","lat": "12.871107","lng": "103.094098"}
,{"code": "VL201050400","name": "Thngor","lat": "12.889712","lng": "103.079898"}
,{"code": "VL201050500","name": "Boh Khnor","lat": "12.862777","lng": "103.07851"}
,{"code": "VL201050600","name": "Changhour Svay","lat": "12.872233","lng": "103.103624"}
,{"code": "VL201050700","name": "Doung","lat": "12.868535","lng": "103.122178"}

								]
							}
							,{
								"code": "20106"
								,"name": "Phnum Sampov"
								,"villages": [
								{"code": "VL201060100","name": "Chaeng Kdar","lat": "13.038497","lng": "103.13063"}
,{"code": "VL201060200","name": "Kampouv","lat": "13.039288","lng": "103.114952"}
,{"code": "VL201060300","name": "Kouk Ampil","lat": "13.032024","lng": "103.110398"}
,{"code": "VL201060400","name": "Sampov Lech","lat": "13.022223","lng": "103.097549"}
,{"code": "VL201060500","name": "Sampov Kaeut","lat": "13.029279","lng": "103.10581"}
,{"code": "VL201060600","name": "Samnanh","lat": "13.021869","lng": "103.089928"}
,{"code": "VL201060700","name": "Kdaong","lat": "13.010232","lng": "103.096737"}
,{"code": "VL201060800","name": "Krapeu Cheung","lat": "13.024754","lng": "103.080375"}
,{"code": "VL201060900","name": "Krapeu Tboung","lat": "13.019066","lng": "103.069017"}
,{"code": "201061000","name": "Krapeu Kaeut","lat": "13.018823","lng": "103.080126"}

								]
							}
							,{
								"code": "20107"
								,"name": "Snoeng"
								,"villages": [
								{"code": "VL201070100","name": "Samraong","lat": "12.97844","lng": "103.064198"}
,{"code": "VL201070200","name": "Kor","lat": "12.978426","lng": "103.052687"}
,{"code": "VL201070300","name": "Snoeng Lech","lat": "12.957955","lng": "103.063536"}
,{"code": "VL201070400","name": "Snoeng Kaeut","lat": "12.976095","lng": "103.031168"}
,{"code": "VL201070500","name": "Boeng Chaeng","lat": "12.950469","lng": "103.031821"}
,{"code": "VL201070600","name": "Boeng Prei","lat": "12.953818","lng": "102.977049"}
,{"code": "VL201070700","name": "Peak Sbaek","lat": "12.973297","lng": "103.011385"}
,{"code": "VL201070800","name": "Preah Srae","lat": "12.962834","lng": "103.041538"}
,{"code": "VL201070900","name": "Rumchey","lat": "12.934355","lng": "103.017564"}
,{"code": "VL201071000","name": "Sambuor Meas","lat": "12.959454","lng": "103.051286"}
,{"code": "VL201071100","name": "Boeung Krasal","lat": "13.011162","lng": "102.980595"}

								]
							}
							,{
								"code": "20108"
								,"name": "Ta Kream"
								,"villages": [
								{"code": "VL201080100","name": "Paoy Svay","lat": "13.048827","lng": "103.060489"}
,{"code": "VL201080200","name": "Ta Kream","lat": "13.062376","lng": "103.059462"}
,{"code": "VL201080300","name": "Thmei","lat": "13.073193","lng": "103.055689"}
,{"code": "VL201080400","name": "Ou Pong Moan","lat": "13.086869","lng": "103.029591"}
,{"code": "VL201080500","name": "Ta Ngaen","lat": "13.079055","lng": "102.979785"}
,{"code": "VL201080600","name": "Prey Phdau","lat": "13.11358","lng": "103.018489"}
,{"code": "VL201080700","name": "Ou Ta Nhea","lat": "13.088781","lng": "103.004424"}
,{"code": "VL201080800","name": "Dangkot Thnong","lat": "13.100225","lng": "102.937026"}
,{"code": "VL201080900","name": "Andong Neang","lat": "13.097004","lng": "102.923039"}
,{"code": "VL201081000","name": "Anglong Svay","lat": "13.065792","lng": "102.930122"}
,{"code": "VL201081100","name": "Slab Pang","lat": "13.038192","lng": "102.906413"}

								]
							}
						]
					}
					,{
						"code":  "202"
						,"name":  "Thma Koul"
						,"communes": [		
							{
								"code": "20201"
								,"name": "Ta Pung"
								,"villages": [
								{"code": "VL202010100","name": "Thma Koul Tboung","lat": "13.270485","lng": "103.09104"}
,{"code": "VL202010200","name": "Paoy Yong","lat": "13.262359","lng": "103.092026"}
,{"code": "VL202010300","name": "Kaksekam","lat": "13.254225","lng": "103.092089"}
,{"code": "VL202010400","name": "Paoy Samraong","lat": "13.234418","lng": "103.102392"}
,{"code": "VL202010500","name": "Kouk Kduoch","lat": "13.270527","lng": "103.096575"}
,{"code": "VL202010600","name": "Ang Tboung","lat": "13.272492","lng": "103.117783"}
,{"code": "VL202010700","name": "Tumpung Tboung","lat": "13.26916","lng": "103.156563"}

								]
							}
							,{
								"code": "20202"
								,"name": "Ta Meun"
								,"villages": [
								{"code": "VL202020100","name": "Thma Koul Cheung","lat": "13.273197","lng": "103.091018"}
,{"code": "VL202020200","name": "Kouk Trab","lat": "13.276798","lng": "103.089145"}
,{"code": "VL202020300","name": "Tumneab","lat": "13.27864","lng": "103.093744"}
,{"code": "VL202020400","name": "Ta Sei","lat": "13.286739","lng": "103.089067"}
,{"code": "VL202020500","name": "Chrouy Mtes","lat": "13.28131","lng": "103.088187"}
,{"code": "VL202020600","name": "Krasang","lat": "13.284069","lng": "103.094624"}
,{"code": "VL202020700","name": "Samraong","lat": "13.281406","lng": "103.101104"}
,{"code": "VL202020800","name": "Thmei","lat": "13.278729","lng": "103.105739"}
,{"code": "VL202020900","name": "Ang Cheung","lat": "13.281625","lng": "103.130631"}
,{"code": "VL202021000","name": "Tumpung Cheung","lat": "13.277281","lng": "103.154656"}

								]
							}
							,{
								"code": "20203"
								,"name": "Ou Ta Ki"
								,"villages": [
								{"code": "VL202030100","name": "Ou Ta Ki","lat": "13.148939","lng": "103.116175"}
,{"code": "VL202030200","name": "Popeal Khae","lat": "13.160392","lng": "103.11403"}
,{"code": "VL202030300","name": "Veal Trea","lat": "13.193804","lng": "103.110085"}
,{"code": "VL202030400","name": "Tras","lat": "13.178609","lng": "103.133261"}
,{"code": "VL202030500","name": "Prey Totueng","lat": "13.158022","lng": "103.161086"}
,{"code": "VL202030600","name": "Prey Dach","lat": "13.166169","lng": "103.16287"}
,{"code": "VL202030700","name": "Trang","lat": "13.148905","lng": "103.150087"}
,{"code": "VL202030800","name": "Kakoh","lat": "13.1334","lng": "103.130836"}

								]
							}
							,{
								"code": "20204"
								,"name": "Chrey"
								,"villages": [
									
{"code": "VL202040100","name": "Chrey Thmei","lat": "13.101815","lng": "103.13753"}
,{"code": "VL202040200","name": "Chrey","lat": "13.128058","lng": "103.141943"}
,{"code": "VL202040300","name": "Ka Kou","lat": "13.123559","lng": "103.144743"}
,{"code": "VL202040400","name": "Svay Chrum","lat": "13.117179","lng": "103.137414"}
,{"code": "VL202040500","name": "Kbal Khmaoch","lat": "13.114468","lng": "103.137434"}
,{"code": "VL202040600","name": "Prey Totueng","lat": "13.092797","lng": "103.140364"}
,{"code": "VL202040700","name": "Hai San","lat": "13.107231","lng": "103.136567"}
,{"code": "VL202040800","name": "Popeal Khae","lat": "13.110009","lng": "103.145767"}
,{"code": "VL202040900","name": "Anlong Run","lat": "13.11088","lng": "103.14115"}
,{"code": "VL202041000","name": "Kruos","lat": "13.109996","lng": "103.143923"}

								]
							}
							,{
								"code": "20205"
								,"name": "Anlong Run"
								,"villages": [
									{"code": "VL202050100","name": "Char","lat": "13.171574","lng": "103.038314"}
,{"code": "VL202050200","name": "Sla Slak","lat": "13.184141","lng": "103.027146"}
,{"code": "VL202050300","name": "Chab Kab","lat": "13.1834","lng": "103.048366"}
,{"code": "VL202050400","name": "Souphi","lat": "13.174186","lng": "103.025381"}
,{"code": "VL202050500","name": "Kruos","lat": "13.136329","lng": "103.038594"}

								]
							}
							,{
								"code": "20206"
								,"name": "Chrouy Sdau"
								,"villages": [
									{"code": "VL202060100","name": "Chrouy Sdau","lat": "13.323809","lng": "103.062409"}
,{"code": "VL202060200","name": "Nikom Krau","lat": "13.335589","lng": "103.095145"}
,{"code": "VL202060300","name": "Nikom Knong","lat": "13.336583","lng": "103.107135"}

								]
							}
							,{
								"code": "20207"
								,"name": "Boeng Pring"
								,"villages": [
									{"code": "VL202070100","name": "Boeng Pring","lat": "13.366754","lng": "103.033978"}
,{"code": "VL202070200","name": "Ou Nhor","lat": "13.393786","lng": "103.023605"}
,{"code": "VL202070300","name": "Snuol Kaong","lat": "13.366523","lng": "103.004443"}
,{"code": "VL202070400","name": "Paoy Ta Sek","lat": "13.393004","lng": "103.039304"}

								]
							}
							,{
								"code": "20208"
								,"name": "Kouk Khmum"
								,"villages": [
									{"code": "VL202080100","name": "Kien Kaes Muoy","lat": "13.265015","lng": "103.084623"}
,{"code": "VL202080200","name": "Kien Kaes Pir","lat": "13.264994","lng": "103.081856"}
,{"code": "VL202080300","name": "Ta Meakh","lat": "13.261267","lng": "103.067122"}
,{"code": "VL202080400","name": "Chranieng","lat": "13.269415","lng": "103.068903"}
,{"code": "VL202080500","name": "Kouk Khmum","lat": "13.272946","lng": "103.057803"}
,{"code": "VL202080600","name": "Kandal Tboung","lat": "13.27111","lng": "103.054127"}
,{"code": "VL202080700","name": "Kandal Cheung","lat": "13.272931","lng": "103.055958"}
,{"code": "VL202080800","name": "Chhkae Koun","lat": "13.270975","lng": "103.045999"}

								]
							}
							,{
								"code": "20209"
								,"name": "Bansay Traeng"
								,"villages": [
									{"code": "VL202090100","name": "Bansay Traeng","lat": "13.27099","lng": "103.038442"}
,{"code": "VL202090200","name": "Ta Kay","lat": "13.266421","lng": "103.03202"}
,{"code": "VL202090300","name": "Thmei","lat": "13.265482","lng": "103.027414"}
,{"code": "VL202090400","name": "Prey Leav","lat": "13.264528","lng": "103.020963"}
,{"code": "VL202090500","name": "Kaong Kang","lat": "13.263517","lng": "103.007132"}
,{"code": "VL202090600","name": "Thmea","lat": "13.275465","lng": "103.03287"}
,{"code": "VL202090700","name": "Spean","lat": "13.283549","lng": "103.026346"}
,{"code": "VL202090800","name": "Tuol Ta Sokh","lat": "13.287049","lng": "103.011554"}

								]
							}
							,{
								"code": "20210"
								,"name": "Rung Chrey"
								,"villages": [
									{"code": "VL202100100","name": "Ballang Kraom","lat": "13.272365","lng": "102.983071"}
,{"code": "VL202100200","name": "Prakeab","lat": "13.261425","lng": "102.971167"}
,{"code": "VL202100300","name": "Kouk Khpos","lat": "13.258853","lng": "102.988718"}
,{"code": "VL202100400","name": "Paoy Rumchey","lat": "13.321207","lng": "102.988204"}
,{"code": "VL202100500","name": "Preah Ponlea","lat": "13.333079","lng": "103.003795"}
,{"code": "VL202100600","name": "Rung Chrey","lat": "13.284149","lng": "102.987587"}
,{"code": "VL202100700","name": "Tuol","lat": "13.302252","lng": "102.991129"}

								]
							}

						]
					}
					,{
						"code":  "203"
						,"name":  "Bat Dambang"
						,"communes": [		
							{
								"code": "20301"
								,"name": "Tuol Ta Aek"
								,"villages": [
									{"code": "VL203010100","name": "Ou Ta Kam Muoy","lat": "13.094946","lng": "103.188296"}
,{"code": "VL203010200","name": "Ou Ta Kam Pir","lat": "13.092241","lng": "103.189238"}
,{"code": "VL203010300","name": "Ou Ta Kam Bei","lat": "13.093525","lng": "103.19181"}
,{"code": "VL203010400","name": "Tuol Ta Aek","lat": "13.10124","lng": "103.183639"}
,{"code": "VL203010500","name": "Dangkao Teab","lat": "13.083979","lng": "103.186532"}

								]
							}
							,{
								"code": "20302"
								,"name": "Preaek Preah Sdach"
								,"villages": [
									{"code": "VL203020100","name": "Preaek Preah Sdach","lat": "13.089657","lng": "103.202258"}
,{"code": "VL203020200","name": "Preaek Ta Tan","lat": "13.081586","lng": "103.20357"}
,{"code": "VL203020300","name": "Dabbei Meakkakra","lat": "13.083196","lng": "103.214236"}
,{"code": "VL203020400","name": "Ou Khcheay","lat": "13.085242","lng": "103.222483"}
,{"code": "VL203020500","name": "La Edth","lat": "13.085704","lng": "103.20177"}
,{"code": "VL203020600","name": "Num Krieb","lat": "13.087388","lng": "103.204819"}
,{"code": "VL203020700","name": "Baek Chan Thmei","lat": "13.08878","lng": "103.211393"}
,{"code": "VL203020800","name": "Chamkar Ruessei","lat": "13.085146","lng": "103.208653"}

								]
							}
							,{
								"code": "20303"
								,"name": "Rotanak"
								,"villages": [
									{"code": "VL203030100","name": "Rumchek Muoy","lat": "13.105908","lng": "103.204814"}
,{"code": "VL203030200","name": "Rumchek Pir","lat": "13.103906","lng": "103.211957"}
,{"code": "VL203030300","name": "Rumchek Bei","lat": "13.101427","lng": "103.210379"}
,{"code": "VL203030400","name": "Rumchek Buon","lat": "13.095992","lng": "103.208574"}
,{"code": "VL203030500","name": "Rumchek Pram","lat": "13.102318","lng": "103.208529"}
,{"code": "VL203030600","name": "Souphi Muoy","lat": "13.112286","lng": "103.212145"}
,{"code": "VL203030700","name": "Souphi Pir","lat": "13.106844","lng": "103.209418"}
,{"code": "VL203030800","name": "Rotanak","lat": "13.105895","lng": "103.20297"}

								]
							}
							,{
								"code": "20304"
								,"name": "Chamkar Samraong"
								,"villages": [
									{"code": "VL203040100","name": "Chamkar Samraong Muoy","lat": "13.12672","lng": "103.179791"}
,{"code": "VL203040200","name": "Chamkar Samraong Pir","lat": "13.116691","lng": "103.191835"}
,{"code": "VL203040300","name": "Voat Lieb","lat": "13.108613","lng": "103.203872"}
,{"code": "VL203040400","name": "Voat Rumduol","lat": "13.112267","lng": "103.209379"}
,{"code": "VL203040500","name": "Phka Sla","lat": "13.108555","lng": "103.195573"}

								]
							}
							,{
								"code": "20305"
								,"name": "Sla Kaet"
								,"villages": [
									{"code": "VL203050100","name": "Sla Kaet","lat": "13.124939","lng": "103.212054"}
,{"code": "VL203050200","name": "Dam Spey","lat": "13.122228","lng": "103.212073"}
,{"code": "VL203050300","name": "Chrey Kaong","lat": "13.11826","lng": "103.197817"}

								]
							}
							,{
								"code": "20306"
								,"name": "Kdol Daun Teav"
								,"villages": [
									{"code": "VL203060100","name": "Chong Preaek","lat": "13.14565","lng": "103.200836"}
,{"code": "VL203060200","name": "Kdol","lat": "13.134864","lng": "103.205609"}
,{"code": "VL203060300","name": "Ou Ta Nob","lat": "13.142028","lng": "103.19994"}
,{"code": "VL203060400","name": "Ta Pruoch","lat": "13.135727","lng": "103.203675"}
,{"code": "VL203060500","name": "Ta Koy","lat": "13.127976","lng": "103.202902"}
,{"code": "VL203060600","name": "Kantuot","lat": "13.131272","lng": "103.21293"}
,{"code": "VL203060700","name": "Thkov","lat": "13.135798","lng": "103.21382"}

								]
							}
							,{
								"code": "20307"
								,"name": "Ou Mal"
								,"villages": [
									{"code": "VL203070100","name": "Ou Mal","lat": "13.077559","lng": "103.157996"}
,{"code": "VL203070200","name": "Dak Sasar","lat": "13.069816","lng": "103.142011"}
,{"code": "VL203070300","name": "Sala Balat","lat": "13.076799","lng": "103.178286"}
,{"code": "VL203070400","name": "Prey Dach","lat": "13.088365","lng": "103.152383"}
,{"code": "VL203070500","name": "Kouk Ponley","lat": "13.049376","lng": "103.135157"}
,{"code": "VL203070600","name": "Voat Roka","lat": "13.085693","lng": "103.157936"}
,{"code": "VL203070700","name": "Koun Sek","lat": "13.064866","lng": "103.152558"}
,{"code": "VL203070800","name": "Andoung Pring","lat": "13.06672","lng": "103.158998"}
,{"code": "VL203070900","name": "Boeng Reang","lat": "13.059417","lng": "103.148911"}
,{"code": "VL203071000","name": "Prey Roka","lat": "13.069924","lng": "103.154531"}

								]
							}
							,{
								"code": "20308"
								,"name": "Voat Kor"
								,"villages": [
									{"code": "VL203080100","name": "Voat Kor","lat": "13.07605","lng": "103.20042"}
,{"code": "VL203080200","name": "Chrab Krasang","lat": "13.054158","lng": "103.171998"}
,{"code": "VL203080300","name": "Ballang","lat": "13.041479","lng": "103.168404"}
,{"code": "VL203080400","name": "Khsach Pouy","lat": "13.037083","lng": "103.185952"}
,{"code": "VL203080500","name": "Damnak Luong","lat": "13.083203","lng": "103.189304"}
,{"code": "VL203080600","name": "Kampong Seima","lat": "13.059743","lng": "103.195006"}

								]
							}
							,{
								"code": "20309"
								,"name": "Ou Char"
								,"villages": [
									{"code": "VL203090100","name": "Ou Char","lat": "13.105772","lng": "103.18545"}
,{"code": "VL203090200","name": "Prey Koun Sek","lat": "13.096537","lng": "103.162705"}
,{"code": "VL203090300","name": "Kab Kou Thmei","lat": "13.110311","lng": "103.188183"}
,{"code": "VL203090400","name": "Andoung Chenh","lat": "13.106565","lng": "103.169768"}
,{"code": "VL203090500","name": "Anhchanh","lat": "13.107534","lng": "103.178982"}
,{"code": "VL203090600","name": "Ang","lat": "13.097553","lng": "103.173523"}

								]
							}
							,{
								"code": "20310"
								,"name": "Svay Pao"
								,"villages": [
									{"code": "VL203100100","name": "Preaek Moha Tep","lat": "13.104959","lng": "103.198366"}
,{"code": "VL203100200","name": "Kampong Krabei","lat": "13.099536","lng": "103.198405"}
,{"code": "VL203100300","name": "Mphey Osakphea","lat": "13.102248","lng": "103.198386"}
,{"code": "VL203100400","name": "Kammeakkar","lat": "13.085973","lng": "103.197582"}

								]
							}

						]
					}
					,{
						"code":  "204"
						,"name":  "Bavel"
						,"communes": [		
							{
								"code": "20401"
								,"name": "Bavel"
								,"villages": [
									{"code": "VL204010100","name": "Bavel Muoy","lat": "13.254196","lng": "102.876886"}
,{"code": "VL204010200","name": "Bavel Pir","lat": "13.261884","lng": "102.873341"}
,{"code": "VL204010300","name": "Tumnob Tuek","lat": "13.25575","lng": "102.867066"}
,{"code": "VL204010400","name": "Dach Proat","lat": "13.249808","lng": "102.876241"}
,{"code": "VL204010500","name": "Sangkae Vear","lat": "13.236408","lng": "102.873175"}
,{"code": "VL204010600","name": "Peam","lat": "13.230809","lng": "102.873639"}
,{"code": "VL204010700","name": "Kampong Phnov","lat": "13.229882","lng": "102.870879"}
,{"code": "VL204010800","name": "Stueng Dach","lat": "13.24617","lng": "102.873505"}
,{"code": "VL204010900","name": "Spean Kandaol","lat": "13.25709","lng": "102.882636"}
,{"code": "VL204011000","name": "Sang Reang","lat": "13.27003","lng": "102.917583"}
,{"code": "VL204011100","name": "Svay Chrum","lat": "13.274571","lng": "102.920312"}
,{"code": "VL204011200","name": "Doun av","lat": "13.277312","lng": "102.923979"}
,{"code": "VL204011300","name": "Prey Totueng Muoy","lat": "13.26593","lng": "102.87195"}
,{"code": "VL204011400","name": "Prey Totueng Pir","lat": "13.270091","lng": "102.869192"}
,{"code": "VL204011500","name": "Kouk","lat": "13.278522","lng": "102.852004"}
,{"code": "VL204011600","name": "Sla Khlanh","lat": "13.281249","lng": "102.853825"}
,{"code": "VL204011700","name": "Kampong Chhnang Muoy","lat": "13.241782","lng": "102.862049"}
,{"code": "VL204011800","name": "Kampong Chhnang Pir","lat": "13.237914","lng": "102.862018"}
,{"code": "VL204011900","name": "Sameakki","lat": "13.249813","lng": "102.862763"}

								]
							}
							,{
								"code": "20402"
								,"name": "Khnach Romeas"
								,"villages": [
									{"code": "VL204020100","name": "Prey Sangha","lat": "13.269533","lng": "102.948781"}
,{"code": "VL204020200","name": "Kaoh Ream","lat": "13.248846","lng": "102.945273"}
,{"code": "VL204020300","name": "Rung Ampil","lat": "13.254696","lng": "102.932235"}
,{"code": "VL204020400","name": "Ballangk Leu","lat": "13.268467","lng": "102.938687"}
,{"code": "VL204020500","name": "Svay Sa","lat": "13.266921","lng": "102.953195"}
,{"code": "VL204020600","name": "Khnach Romeas","lat": "13.258353","lng": "102.959872"}
,{"code": "VL204020700","name": "Ballangk Mean Chey","lat": "13.182291","lng": "102.916658"}
,{"code": "VL204020800","name": "Chrouy Sna","lat": "13.28719","lng": "102.941823"}

								]
							}
							,{
								"code": "20403"
								,"name": "Lvea"
								,"villages": [
									,{"code": "VL204030100","name": "Lvea","lat": "13.352208","lng": "102.91042"}
,{"code": "VL204030200","name": "Doun Nhaem","lat": "13.353127","lng": "102.912258"}
,{"code": "VL204030300","name": "Chamkar","lat": "13.35495","lng": "102.914088"}
,{"code": "VL204030400","name": "Dangkao","lat": "13.352277","lng": "102.918726"}
,{"code": "VL204030500","name": "Ream Sena","lat": "13.358617","lng": "102.920517"}
,{"code": "VL204030600","name": "Doun Aok","lat": "13.364077","lng": "102.925085"}
,{"code": "VL204030700","name": "Ping Pong","lat": "13.345326","lng": "102.952933"}
,{"code": "VL204030800","name": "Svay Prey","lat": "13.345467","lng": "102.970467"}
,{"code": "VL204030900","name": "Boeng Samraong","lat": "13.316342","lng": "102.944872"}
,{"code": "VL204031000","name": "Kbal Spean","lat": "13.353089","lng": "102.907644"}
,{"code": "VL204031100","name": "Lvea Chas","lat": "13.354912","lng": "102.909474"}
,{"code": "VL204031200","name": "Ta Ni","lat": "13.369979","lng": "102.877261"}

								]
							}
							,{
								"code": "20404"
								,"name": "Prey Khpos"
								,"villages": [
									{"code": "VL204040100","name": "Ta Hi","lat": "13.346608","lng": "102.905226"}
,{"code": "VL204040200","name": "Pou","lat": "13.336778","lng": "102.902247"}
,{"code": "VL204040300","name": "Ta Mat","lat": "13.333975","lng": "102.891197"}
,{"code": "VL204040400","name": "Meakkloea","lat": "13.32022","lng": "102.867324"}
,{"code": "VL204040500","name": "Prey Khpos","lat": "13.308404","lng": "102.859123"}
,{"code": "VL204040600","name": "Sranal","lat": "13.349333","lng": "102.897164"}
,{"code": "VL204040700","name": "Dangkao Pen","lat": "13.342131","lng": "102.893895"}
,{"code": "VL204040800","name": "Kbal Thnal","lat": "13.302241","lng": "102.878554"}
,{"code": "VL204040900","name": "Boeng Chumnieng","lat": "13.391525","lng": "102.749151"}

								]
							}
							,{
								"code": "20405"
								,"name": "Ampil Pram Daeum"
								,"villages": [
									{"code": "VL204050100","name": "Dangkao Krameang","lat": "13.246614","lng": "102.819075"}
,{"code": "VL204050200","name": "Siem","lat": "13.253541","lng": "102.783958"}
,{"code": "VL204050300","name": "Ampil","lat": "13.260414","lng": "102.777272"}
,{"code": "VL204050400","name": "Sthapaor Muoy","lat": "13.260957","lng": "102.772267"}
,{"code": "VL204050500","name": "Ta Khiev","lat": "13.260485","lng": "102.759615"}
,{"code": "VL204050600","name": "Buo Run","lat": "13.262487","lng": "102.767392"}
,{"code": "VL204050700","name": "Doung","lat": "13.258585","lng": "102.769642"}
,{"code": "VL204050800","name": "Sthapaor Pir","lat": "13.292058","lng": "102.772048"}
,{"code": "VL204050900","name": "Bo Chum","lat": "13.331897","lng": "102.743171"}
,{"code": "VL204051000","name": "Boeng Sangke","lat": "13.274972","lng": "102.717083"}
,{"code": "VL204051100","name": "Boeng Popoul","lat": "13.292418","lng": "102.687784"}
,{"code": "VL204051101","name": "Beung Popoul","lat": "13.275795","lng": "102.665499"}
,{"code": "VL204051200","name": "Thmei","lat": "13.257668","lng": "102.749577"}
,{"code": "VL204051300","name": "Boeng Arak","lat": "13.233088","lng": "102.740293"}
,{"code": "VL204051400","name": "Kob","lat": "13.298868","lng": "102.820675"}
,{"code": "VL204051500","name": "Boeng Snuol","lat": "13.256987","lng": "102.795781"}

								]
							}
							,{
								"code": "20406"
								,"name": "Kdol Ta Haen"
								,"villages": [
									{"code": "VL204060100","name": "Suon Sla","lat": "13.225202","lng": "102.851549"}
,{"code": "VL204060200","name": "Kdol Kraom","lat": "13.179064","lng": "102.81463"}
,{"code": "VL204060300","name": "San","lat": "13.098616","lng": "102.744844"}
,{"code": "VL204060400","name": "Peam","lat": "13.209175","lng": "102.84455"}
,{"code": "VL204060500","name": "Kandal","lat": "13.207525","lng": "102.850366"}
,{"code": "VL204060600","name": "Buor","lat": "13.203482","lng": "102.846666"}
,{"code": "VL204060700","name": "Thmei","lat": "13.195646","lng": "102.812463"}
,{"code": "VL204060800","name": "Tuol Krasang","lat": "13.188925","lng": "102.836188"}
,{"code": "VL204060900","name": "Kdol Leu","lat": "13.178034","lng": "102.828408"}
,{"code": "VL204061000","name": "Ta Haen","lat": "13.163525","lng": "102.82682"}
,{"code": "VL204061100","name": "Anlong Reang","lat": "13.123128","lng": "102.791338"}
,{"code": "VL204061200","name": "Anlong Rey","lat": "13.138029","lng": "102.777761"}
,{"code": "VL204061300","name": "Boeung Sangkae","lat": "13.095378","lng": "102.873258"}
,{"code": "VL204061400","name": "Boeng Anlok","lat": "13.151469","lng": "102.863222"}
,{"code": "VL204061500","name": "Prab Hoeb","lat": "13.088717","lng": "102.82757"}
,{"code": "VL204061600","name": "Buor Sangreach","lat": "13.108777","lng": "102.764001"}
,{"code": "VL204061700","name": "Chrang Bak","lat": "13.128033","lng": "102.795332"}
,{"code": "VL204061800","name": "Domnak Dangkoa","lat": "13.184943","lng": "102.740155"}
,{"code": "VL204061900","name": "Khleang","lat": "13.138178","lng": "102.807736"}
,{"code": "VL204062000","name": "Kampong Makak","lat": "13.14086","lng": "102.820187"}
,{"code": "VL204062100","name": "Ou Doun Pov","lat": "13.149335","lng": "102.825442"}
,{"code": "VL204062200","name": "Prey Thum","lat": "13.084443","lng": "102.907407"}
,{"code": "VL204062201","name": "O Ta Nhean","lat": "13.044576","lng": "102.83795"}
,{"code": "VL204062202","name": "Po Steav","lat": "13.01534","lng": "102.78641"}
,{"code": "VL204062300","name": "Srah Tuek","lat": "13.119499","lng": "102.7636"}
,{"code": "VL204062400","name": "Tuol Snuol","lat": "13.07878","lng": "102.847422"}
,{"code": "VL204062500","name": "Trapeang Kbal Sva","lat": "13.061286","lng": "102.797097"}
,{"code": "VL204062501","name": "Kor Svay","lat": "","lng": ""}
,{"code": "VL204062600","name": "Ta Kot","lat": "13.153695","lng": "102.804638"}
,{"code": "VL204062700","name": "Tomnob Takuon","lat": "13.082687","lng": "102.870601"}
,{"code": "VL204062900","name": "Prey Preal","lat": "13.076583","lng": "102.871495"}

								]
							}
							,{
								"code": "220401"
								,"name": "Bansay Reak"
								,"villages": [
									{"code": "VL2204010100","name": "Bansay Reak","lat": "14.235271","lng": "103.461954"}
,{"code": "VL2204010200","name": "Kamnab","lat": "14.21338","lng": "103.483339"}
,{"code": "VL2204010300","name": "Rumduol Veasna","lat": "14.241498","lng": "103.438142"}
,{"code": "VL2204010400","name": "Sambuor Meas","lat": "14.264064","lng": "103.459757"}
,{"code": "VL2204010500","name": "Tnaot","lat": "14.268881","lng": "103.50942"}
,{"code": "VL2204010600","name": "Cheung Phnum","lat": "14.338223","lng": "103.507127"}
,{"code": "VL2204010700","name": "O Chor","lat": "14.249629","lng": "103.422416"}
,{"code": "VL2204010800","name": "Tansayoeut","lat": "14.276528","lng": "103.506561"}
,{"code": "VL2204010900","name": "Trapaing Trav","lat": "0","lng": "0"}
,{"code": "VL2204011100","name": "mhoam Senchey","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "220402"
								,"name": "Bos Sbov"
								,"villages": [
									{"code": "VL2204020100","name": "Bos Sbov","lat": "14.135903","lng": "103.481186"}
,{"code": "VL2204020200","name": "Krasang","lat": "14.104475","lng": "103.408481"}
,{"code": "VL2204020300","name": "Phlong","lat": "14.120654","lng": "103.481231"}
,{"code": "VL2204020400","name": "Ou Preal","lat": "14.103909","lng": "103.399538"}
,{"code": "VL2204020500","name": "Trabaek","lat": "14.152102","lng": "103.484228"}
,{"code": "VL2204020600","name": "Prasat","lat": "14.090892","lng": "103.38034"}
,{"code": "VL2204020700","name": "Pong Tuek","lat": "14.11685","lng": "103.471495"}
,{"code": "VL2204020800","name": "Phlong Thmei","lat": "14.124181","lng": "103.477179"}
,{"code": "VL2204020900","name": "Pou Chum","lat": "14.158857","lng": "103.490464"}
,{"code": "VL2204021000","name": "Prasat Phnum Dei","lat": "14.171342","lng": "103.480765"}
,{"code": "VL2204021200","name": "Kandol Kor","lat": "0","lng": "0"}
,{"code": "VL2204021400","name": "Phnom Dei","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "220403"
								,"name": "Koun Kriel"
								,"villages": [
									{"code": "VL2204030100","name": "Khtum","lat": "14.245695","lng": "103.575889"}
,{"code": "VL2204030200","name": "Ta Man","lat": "14.240239","lng": "103.57799"}
,{"code": "VL2204030300","name": "Thnal Bat","lat": "14.234762","lng": "103.566088"}
,{"code": "VL2204030400","name": "Anlong Veaeng","lat": "14.229107","lng": "103.560675"}
,{"code": "VL2204030500","name": "Trapeang Veaeng","lat": "14.198485","lng": "103.562592"}
,{"code": "VL2204030600","name": "Thmei","lat": "14.25022","lng": "103.584331"}
,{"code": "VL2204030700","name": "Trapeang Slaeng","lat": "14.255602","lng": "103.586457"}
,{"code": "VL2204030800","name": "Kouk Prasat","lat": "14.341002","lng": "103.635414"}
,{"code": "VL2204030801","name": "Kok Prasath Thmey","lat": "14.341002","lng": "103.635414"}
,{"code": "VL2204030900","name": "Kdol","lat": "14.31669","lng": "103.564012"}
,{"code": "VL2204031000","name": "Kirivaont","lat": "14.300146","lng": "103.626354"}
,{"code": "VL2204031100","name": "Champa Sokh","lat": "14.283077","lng": "103.607197"}
,{"code": "VL2204031200","name": "Ph ong","lat": "14.358333","lng": "103.645305"}
,{"code": "VL2204031201","name": "Phaong Thmey","lat": "14.358333","lng": "103.645305"}
,{"code": "VL2204031300","name": "O Pork","lat": "14.409888","lng": "103.692369"}
,{"code": "VL2204031400","name": "Koun Kriel","lat": "14.318605","lng": "103.642086"}
,{"code": "VL2204031500","name": "Chheu Kram","lat": "14.290577","lng": "103.614427"}
,{"code": "VL2204031600","name": "Ou Pok","lat": "14.394842","lng": "103.667352"}
,{"code": "VL2204031700","name": "Baoh","lat": "14.29535","lng": "103.726052"}
,{"code": "VL2204031701","name": "Baoh Chas Lech","lat": "0","lng": "0"}
,{"code": "VL2204031702","name": "Baoh Thmey Kaut","lat": "0","lng": "0"}
,{"code": "VL2204031703","name": "Bosh Thmey","lat": "14.29535","lng": "103.726052"}
,{"code": "VL2204031800","name": "Kouk Phluk","lat": "14.276595","lng": "103.769575"}
,{"code": "VL2204031801","name": "Kouk Phluk Old","lat": "0","lng": "0"}
,{"code": "VL2204031900","name": "Chhuk Meas","lat": "14.286641","lng": "103.807314"}
,{"code": "VL2204032000","name": "Srah Prich","lat": "","lng": ""}
,{"code": "VL2204032300","name": "Chreung Lech","lat": "","lng": ""}
,{"code": "VL2204032400","name": "Chreung Keut","lat": "","lng": ""}
,{"code": "VL2204032500","name": "Rumduol Cheng Phnum","lat": "0","lng": "0"}
,{"code": "VL2204032600","name": "Krauch Sakorn","lat": "0","lng": "0"}
,{"code": "VL2204032700","name": "Koun Ompel","lat": "0","lng": "0"}
,{"code": "VL2204032701","name": "Kouk Ompel (M)","lat": "0","lng": "0"}
,{"code": "VL2204032800","name": "Dong Torng","lat": "0","lng": "0"}
,{"code": "VL2204032801","name": "Dong Torng (M)","lat": "0","lng": "0"}
,{"code": "VL2204032900","name": "Koul","lat": "0","lng": "0"}
,{"code": "VL2204033000","name": "O Russey","lat": "0","lng": "0"}
,{"code": "VL2204033200","name": "Sam Rong Senchey","lat": "0","lng": "0"}
,{"code": "VL2204033400","name": "Pauy Pong Ro","lat": "0","lng": "0"}
,{"code": "VL2204033600","name": "Ou Phal","lat": "0","lng": "0"}
,{"code": "VL2204033800","name": "Sam Rong Senchey","lat": "0","lng": "0"}
,{"code": "VL2204033900","name": "khnach Russey","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "220404"
								,"name": "Samraong"
								,"villages": [
									{"code": "VL2204040100","name": "Doun Kaen","lat": "14.171389","lng": "103.511364"}
,{"code": "VL2204040200","name": "Ou Ruessei","lat": "14.194138","lng": "103.503702"}
,{"code": "VL2204040300","name": "Pul","lat": "14.189484","lng": "103.524273"}
,{"code": "VL2204040400","name": "Chhuk","lat": "14.187449","lng": "103.521192"}
,{"code": "VL2204040500","name": "Ou Kravan","lat": "14.180985","lng": "103.515193"}
,{"code": "VL2204040600","name": "Phniet","lat": "14.173261","lng": "103.501338"}
,{"code": "VL2204040700","name": "Samraong","lat": "14.174601","lng": "103.506007"}
,{"code": "VL2204040800","name": "Kandaek","lat": "14.196073","lng": "103.52864"}
,{"code": "VL2204040900","name": "Kouk Chambak","lat": "14.150636","lng": "103.524616"}
,{"code": "VL2204041000","name": "Kouk Chres","lat": "14.134134","lng": "103.534013"}
,{"code": "VL2204041100","name": "Kouk Kor","lat": "14.185951","lng": "103.520164"}
,{"code": "VL2204041200","name": "Kouk Rumdoul","lat": "14.200425","lng": "103.532291"}
,{"code": "VL2204041300","name": "Chh'aeub","lat": "14.109139","lng": "103.551706"}
,{"code": "VL2204041400","name": "Ou Kansaeng","lat": "14.204582","lng": "103.533533"}
,{"code": "VL2204041500","name": "Koun Damrei","lat": "14.158488","lng": "103.662941"}
,{"code": "VL2204041600","name": "Bak Nim","lat": "14.1711","lng": "103.746909"}
,{"code": "VL2204041700","name": "Trapeang Tung","lat": "0","lng": "0"}
,{"code": "VL2204041701","name": "Khnach Russey","lat": "0","lng": "0"}
,{"code": "VL2204041900","name": "O Bat Dav","lat": "0","lng": "0"}
,{"code": "VL2204042100","name": "Bo Rey rttbal","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "220405"
								,"name": "Ou Smach"
								,"villages": [
									{"code": "VL2204050100","name": "Akphivodth","lat": "14.420433","lng": "103.70148"}
,{"code": "VL2204050200","name": "Chamkar Chek","lat": "14.421363","lng": "103.697913"}
,{"code": "VL2204050300","name": "Daeum Chrey","lat": "14.424696","lng": "103.699109"}
,{"code": "VL2204050400","name": "Kiri Mongkol","lat": "14.429156","lng": "103.699825"}
,{"code": "VL2204050500","name": "Ruot Champei","lat": "14.418277","lng": "103.687413"}
,{"code": "VL2204050600","name": "Ou Smach","lat": "14.432159","lng": "103.700104"}
,{"code": "VL2204050700","name": "Ou Kla Khmum","lat": "0","lng": "0"}
,{"code": "VL2204050800","name": "Srah Tek","lat": "0","lng": "0"}

								]
							}

						]
					}
					,{
						"code":  "205"
						,"name":  "Aek Phnum"
						,"communes": [		
							{
								"code": "20501"
								,"name": "Preaek Norint"
								,"villages": [
									{"code": "VL205010100","name": "Preaek Ta Chraeng","lat": "13.143067","lng": "103.219301"}
,{"code": "VL205010200","name": "Preaek Krouch","lat": "13.152156","lng": "103.226614"}
,{"code": "VL205010300","name": "Svay Chrum","lat": "13.157573","lng": "103.225653"}
,{"code": "VL205010400","name": "Preaek Norint","lat": "13.164436","lng": "103.232687"}
,{"code": "VL205010500","name": "Sdei","lat": "13.175858","lng": "103.238804"}
,{"code": "VL205010600","name": "Rohal Suong","lat": "13.183828","lng": "103.259742"}
,{"code": "VL205010700","name": "Duong Mea","lat": "13.19035","lng": "103.26047"}
,{"code": "VL205010800","name": "Reach Doun Kaev","lat": "13.193107","lng": "103.267185"}
,{"code": "VL205010900","name": "Ansang Sak","lat": "13.200392","lng": "103.27516"}
,{"code": "VL205011000","name": "Preaek Trab","lat": "13.215912","lng": "103.298116"}

								]
							}
							,{
								"code": "20502"
								,"name": "Samraong Knong"
								,"villages": [
									,{"code": "VL205020100","name": "Samraong Knong","lat": "13.13294","lng": "103.220112"}
,{"code": "VL205020200","name": "Kampong Sambuor","lat": "13.130199","lng": "103.215834"}
,{"code": "VL205020300","name": "Samraong Snao","lat": "13.138637","lng": "103.232245"}
,{"code": "VL205020400","name": "Samraong Ou Trea","lat": "13.131127","lng": "103.224496"}
,{"code": "VL205020500","name": "Samraong Ta Kok","lat": "13.12317","lng": "103.2176"}
,{"code": "VL205020600","name": "Toul Sbov","lat": "13.13525","lng": "103.260546"}

								]
							}
							,{
								"code": "20503"
								,"name": "Preaek Khpob"
								,"villages": [
									{"code": "VL205030100","name": "Preaek Snao","lat": "13.141348","lng": "103.232225"}
,{"code": "VL205030200","name": "Preaek Khpob","lat": "13.155799","lng": "103.23856"}
,{"code": "VL205030300","name": "Sna Pi Mukh","lat": "13.144883","lng": "103.224462"}
,{"code": "VL205030400","name": "Khvet","lat": "13.154293","lng": "103.231081"}
,{"code": "VL205030500","name": "Ou Kambot","lat": "13.16543","lng": "103.261716"}

								]
							}
							,{
								"code": "20504"
								,"name": "Preaek Luong"
								,"villages": [
									{"code": "VL205040100","name": "Preaek Luong","lat": "13.161283","lng": "103.239461"}
,{"code": "VL205040200","name": "Sdei Leu","lat": "13.165769","lng": "103.241191"}
,{"code": "VL205040300","name": "Sdei Kraom","lat": "13.175169","lng": "103.243836"}
,{"code": "VL205040400","name": "Rohal Suong","lat": "13.180766","lng": "103.249321"}
,{"code": "VL205040500","name": "Bak Amraek","lat": "13.193124","lng": "103.269676"}
,{"code": "VL205040600","name": "Doun Ent","lat": "13.207176","lng": "103.287917"}
,{"code": "VL205040700","name": "Bak Roteh","lat": "13.206923","lng": "103.305558"}

								]
							}
							,{
								"code": "20505"
								,"name": "Peam Aek"
								,"villages": [
									{"code": "VL205050100","name": "Doun Teav","lat": "13.144312","lng": "103.209958"}
,{"code": "VL205050200","name": "Suos Ei","lat": "13.146967","lng": "103.214772"}
,{"code": "VL205050300","name": "Peam Aek","lat": "13.155835","lng": "103.208491"}
,{"code": "VL205050400","name": "Kong Tum","lat": "13.158675","lng": "103.213848"}
,{"code": "VL205050500","name": "Ka Rohal","lat": "13.162848","lng": "103.2044"}
,{"code": "VL205050600","name": "Preaek Chdaor","lat": "13.171008","lng": "103.20803"}
,{"code": "VL205050700","name": "Ta Kom","lat": "13.164513","lng": "103.184096"}
,{"code": "VL205050800","name": "Kouk Doung","lat": "13.187081","lng": "103.18024"}

								]
							}
							,{
								"code": "20506"
								,"name": "Prey Chas"
								,"villages": [
									{"code": "VL205060100","name": "Prey Chas","lat": "13.337357","lng": "103.347115"}
,{"code": "VL205060200","name": "Peam Seima","lat": "13.343057","lng": "103.456992"}
,{"code": "VL205060300","name": "Anlong Sandan","lat": "13.344644","lng": "103.477227"}
,{"code": "VL205060400","name": "Kaoh Chiveang","lat": "13.340098","lng": "103.495589"}
,{"code": "VL205060500","name": "Bak Prea","lat": "13.312391","lng": "103.400818"}

								]
							}
							,{
								"code": "20507"
								,"name": "Kaoh Chiveang"
								,"villages": [
									{"code": "VL205070100","name": "Thvang","lat": "13.265509","lng": "103.573699"}
,{"code": "VL205070200","name": "Kampong Prahok","lat": "13.245037","lng": "103.631957"}
,{"code": "VL205070300","name": "Anlong Ta Uor","lat": "13.237033","lng": "103.656917"}
,{"code": "VL205070400","name": "Preaek Toal","lat": "13.231968","lng": "103.658209"}
,{"code": "VL205070500","name": "Kbal Taol","lat": "13.12179","lng": "103.678382"}

								]
							}

						]
					}
					,{
						"code":  "206"
						,"name":  "Moung Ruessei"
						,"communes": [	
							{
								"code": "20601"
								,"name": "Moung Ruessei"
								,"villages": [
									{"code": "VL206010100","name": "Paen","lat": "12.782594","lng": "103.366015"}
,{"code": "VL206010200","name": "Ou Krabau","lat": "12.794884","lng": "103.362509"}
,{"code": "VL206010300","name": "Kaoh Char","lat": "12.767489","lng": "103.430102"}
,{"code": "VL206010400","name": "Ruessei Muoy","lat": "12.79173","lng": "103.40232"}
,{"code": "VL206010500","name": "Roluos","lat": "12.768936","lng": "103.437719"}
,{"code": "VL206010600","name": "Ruessei Pir","lat": "12.776616","lng": "103.444782"}
,{"code": "VL206010700","name": "Kansai Banteay","lat": "12.770239","lng": "103.436532"}
,{"code": "VL206010800","name": "Ra","lat": "12.769374","lng": "103.442984"}
,{"code": "VL206010900","name": "Daeum Doung","lat": "12.780221","lng": "103.442918"}
,{"code": "VL206011000","name": "Moung","lat": "12.777422","lng": "103.428198"}
,{"code": "VL206011100","name": "Pralay","lat": "12.772995","lng": "103.443883"}
,{"code": "VL206011200","name": "Ta Tok Muoy","lat": "12.777471","lng": "103.436487"}
,{"code": "VL206011300","name": "Ta Tok Pir","lat": "12.775868","lng": "103.432905"}

								]
							}
							,{
								"code": "20602"
								,"name": "Kear"
								,"villages": [
									{"code": "VL206020100","name": "Run","lat": "12.695432","lng": "103.47474"}
,{"code": "VL206020200","name": "Roka Chhmoul","lat": "12.688696","lng": "103.445014"}
,{"code": "VL206020300","name": "Anlong Sdau","lat": "12.748808","lng": "103.458443"}
,{"code": "VL206020400","name": "Pou Muoy","lat": "12.78996","lng": "103.438824"}
,{"code": "VL206020500","name": "Pou Pir","lat": "12.75722","lng": "103.445352"}
,{"code": "VL206020600","name": "Kear Muoy","lat": "12.769205","lng": "103.449662"}
,{"code": "VL206020700","name": "Kear Pir","lat": "12.744748","lng": "103.475339"}
,{"code": "VL206020800","name": "Kear Bei","lat": "12.776298","lng": "103.455265"}
,{"code": "VL206020900","name": "Ou Kriet","lat": "12.707009","lng": "103.460206"}
,{"code": "VL206021000","name": "Ream Kon","lat": "12.802275","lng": "103.43335"}
,{"code": "VL206021100","name": "Ta Nak","lat": "12.762341","lng": "103.440052"}
,{"code": "VL206021200","name": "Koh Thkov","lat": "12.732547","lng": "103.483728"}

								]
							}
							,{
								"code": "20603"
								,"name": "Prey Svay"
								,"villages": [
									{"code": "VL206030100","name": "Kor","lat": "12.767964","lng": "103.512069"}
,{"code": "VL206030200","name": "Cham Ro'a","lat": "12.675879","lng": "103.485979"}
,{"code": "VL206030300","name": "Thnal Bambaek","lat": "12.709969","lng": "103.487545"}
,{"code": "VL206030400","name": "Rumchek","lat": "12.714437","lng": "103.503965"}
,{"code": "VL206030500","name": "Tuol Thnong","lat": "12.715682","lng": "103.539078"}
,{"code": "VL206030600","name": "Kalaom Phluk","lat": "12.713919","lng": "103.547376"}
,{"code": "VL206030700","name": "Srama Meas","lat": "12.710136","lng": "103.513925"}
,{"code": "VL206030800","name": "Prey Svay","lat": "12.725443","lng": "103.498209"}
,{"code": "VL206030900","name": "Prey Preal","lat": "12.696996","lng": "103.537472"}

								]
							}
							,{
								"code": "20604"
								,"name": "Ruessei Krang"
								,"villages": [
									{"code": "VL206040100","name": "Neak Ta Tvear","lat": "12.814877","lng": "103.634638"}
,{"code": "VL206040200","name": "Yeun Mean","lat": "12.657808","lng": "103.601672"}
,{"code": "VL206040300","name": "Tuol Snuol","lat": "12.655627","lng": "103.636089"}
,{"code": "VL206040400","name": "Chrey Run","lat": "12.673837","lng": "103.572821"}
,{"code": "VL206040500","name": "Tuol Roka","lat": "12.671537","lng": "103.566951"}
,{"code": "VL206040600","name": "Nikom Kraom","lat": "12.722889","lng": "103.592899"}
,{"code": "VL206040700","name": "Srah Chineang","lat": "12.653596","lng": "103.586384"}
,{"code": "VL206040800","name": "Pech Changvar","lat": "12.677993","lng": "103.590854"}
,{"code": "VL206040900","name": "Ampil Chhung","lat": "12.70615","lng": "103.57835"}
,{"code": "VL206041000","name": "Thnal Bat","lat": "12.705882","lng": "103.606281"}

								]
							}
							,{
								"code": "20605"
								,"name": "Chrey"
								,"villages": [
									{"code": "VL206050100","name": "Doun Tri","lat": "12.803646","lng": "103.510717"}
,{"code": "VL206050200","name": "Angkrong","lat": "12.803647","lng": "103.510754"}
,{"code": "VL206050300","name": "Tuol Ta Thon","lat": "12.788442","lng": "103.490248"}
,{"code": "VL206050400","name": "Mreah Prov","lat": "12.783101","lng": "103.479567"}
,{"code": "VL206050500","name": "Chrey Muoy","lat": "12.778085","lng": "103.462512"}
,{"code": "VL206050600","name": "Chrey Pir","lat": "12.779657","lng": "103.473297"}
,{"code": "VL206050700","name": "Chrey Cheung","lat": "12.782201","lng": "103.472379"}
,{"code": "VL206050800","name": "Chong Samnay","lat": "12.780307","lng": "103.457654"}

								]
							}
							,{
								"code": "20606"
								,"name": "Ta Loas"
								,"villages": [
									{"code": "VL206060100","name": "Ma Naok","lat": "12.839193","lng": "103.479406"}
,{"code": "VL206060200","name": "Suosdei","lat": "12.844515","lng": "103.46187"}
,{"code": "VL206060300","name": "Sdei Stueng","lat": "12.832382","lng": "103.469378"}
,{"code": "VL206060400","name": "Stueng Thmei","lat": "12.826457","lng": "103.465664"}
,{"code": "VL206060500","name": "Veal","lat": "12.816503","lng": "103.463882"}
,{"code": "VL206060600","name": "Voat Chas","lat": "12.812925","lng": "103.470352"}
,{"code": "VL206060700","name": "Chong Pralay","lat": "12.803832","lng": "103.461196"}
,{"code": "VL206060800","name": "Pralay Sdau","lat": "12.802955","lng": "103.465807"}
,{"code": "VL206060900","name": "Tras","lat": "12.794073","lng": "103.474362"}

								]
							}
							,{
								"code": "20607"
								,"name": "Kakaoh"
								,"villages": [
									{"code": "VL206070100","name": "Tuol Prum Muoy","lat": "12.846153","lng": "103.419527"}
,{"code": "VL206070200","name": "Tuol Prum Pir","lat": "12.85346","lng": "103.438239"}
,{"code": "VL206070300","name": "Chak Touch","lat": "12.821317","lng": "103.36279"}
,{"code": "VL206070400","name": "Chak Thum","lat": "12.841282","lng": "103.375291"}
,{"code": "VL206070500","name": "Kakaoh","lat": "12.839632","lng": "103.401097"}
,{"code": "VL206070600","name": "Srae Ou","lat": "12.831429","lng": "103.390094"}
,{"code": "VL206070700","name": "Ph'ieng","lat": "12.810497","lng": "103.367199"}

								]
							}
							,{
								"code": "20608"
								,"name": "Prey Touch"
								,"villages": [
									{"code": "VL206080100","name": "Koun Khlong","lat": "12.916237","lng": "103.36375"}
,{"code": "VL206080200","name": "Dob Krasang","lat": "12.881969","lng": "103.376872"}
,{"code": "VL206080300","name": "Thmei","lat": "12.897358","lng": "103.380459"}
,{"code": "VL206080400","name": "Prey Touch","lat": "12.898606","lng": "103.370315"}
,{"code": "VL206080500","name": "Prean Nil","lat": "12.870144","lng": "103.364971"}
,{"code": "VL206080600","name": "Stueng Chak","lat": "12.858139","lng": "103.389786"}
,{"code": "VL206080700","name": "Boeng Pring","lat": "12.880828","lng": "103.339103"}
,{"code": "VL206080800","name": "Prey Damrei","lat": "12.886397","lng": "103.362101"}

								]
							}
							,{
								"code": "20609"
								,"name": "Robas Mongkol"
								,"villages": [
									{"code": "VL206090100","name": "Boeng Bei","lat": "12.759432","lng": "103.423557"}
,{"code": "VL206090200","name": "Kuoy Chik Dei","lat": "12.692408","lng": "103.421356"}
,{"code": "VL206090300","name": "Preaek Am","lat": "12.757562","lng": "103.432926"}
,{"code": "VL206090400","name": "Koun K'aek Muoy","lat": "12.748567","lng": "103.440348"}
,{"code": "VL206090500","name": "Koun K'aek Pir","lat": "12.733183","lng": "103.43768"}
,{"code": "VL206090600","name": "Robas Mongkol","lat": "12.73957","lng": "103.447771"}
,{"code": "VL206090700","name": "Anlong Koub","lat": "12.725101","lng": "103.439101"}
,{"code": "VL206090800","name": "Prey Prum Muoy","lat": "12.727738","lng": "103.43403"}
,{"code": "VL206090900","name": "Prey Prum Pir","lat": "12.720484","lng": "103.430391"}
,{"code": "VL206091000","name": "Preah Theat","lat": "12.751592","lng": "103.382689"}
,{"code": "VL206091100","name": "Anlong Trach","lat": "12.691516","lng": "103.39026"}
,{"code": "VL206091200","name": "Anlong Tamok","lat": "12.66179","lng": "103.320906"}

								]
							}

						]
					}
					,{
						"code":  "207"
						,"name":  "Rotonak Mondol"
						,"communes": [		
							{
								"code": "20701"
								,"name": "Sdau"
								,"villages": [
									{"code": "VL207010100","name": "Banang","lat": "12.901974","lng": "102.978775"}
,{"code": "VL207010200","name": "Sdau","lat": "12.905798","lng": "102.997677"}
,{"code": "VL207010300","name": "Chamkar Lmut","lat": "12.888527","lng": "102.985912"}
,{"code": "VL207010400","name": "Boeng Ampil","lat": "12.921819","lng": "102.995006"}
,{"code": "VL207010500","name": "Dangkot","lat": "12.906636","lng": "102.977448"}
,{"code": "VL207010600","name": "Doun Meay","lat": "12.869587","lng": "103.015973"}
,{"code": "VL207010700","name": "Baribour","lat": "12.906186","lng": "102.931452"}
,{"code": "VL207011300","name": "Kouk Choar","lat": "13.005487","lng": "102.831707"}

								]
							}
							,{
								"code": "20702"
								,"name": "Andaeuk Haeb"
								,"villages": [
									{"code": "VL207020100","name": "Andaeuk Haeb","lat": "12.871363","lng": "102.977556"}
,{"code": "VL207020200","name": "Svay Chuor","lat": "12.864695","lng": "102.975398"}
,{"code": "VL207020300","name": "Thma Prus","lat": "12.873742","lng": "102.974331"}
,{"code": "VL207020400","name": "Serei Voant","lat": "12.856258","lng": "102.968991"}
,{"code": "VL207020500","name": "Prey Ampaor","lat": "12.857912","lng": "102.99487"}
,{"code": "VL207020600","name": "Kandal Steung","lat": "12.837217","lng": "103.013999"}
,{"code": "VL207020601","name": "Tmor Korng","lat": "12.829291","lng": "103.002662"}
,{"code": "VL207020700","name": "Thvak","lat": "12.833679","lng": "102.963931"}

								]
							}
							,{
								"code": "20703"
								,"name": "Phlov Meas"
								,"villages": [
									{"code": "VL207030100","name": "Phlov Meas","lat": "12.768076","lng": "102.874527"}
,{"code": "VL207030101","name": "Phlov Meas (M)","lat": "12.764957","lng": "102.85606"}
,{"code": "VL207030200","name": "Sek Sak","lat": "12.778928","lng": "102.882263"}
,{"code": "VL207030300","name": "Tuek Sab","lat": "12.792224","lng": "102.888101"}
,{"code": "VL207030400","name": "Chi Pang","lat": "12.805905","lng": "102.891358"}
,{"code": "VL207030500","name": "Ou Traeng","lat": "12.798976","lng": "102.891701"}
,{"code": "VL207030600","name": "Ou Da","lat": "12.737266","lng": "102.775314"}
,{"code": "VL207030700","name": "Ou Lmun","lat": "12.757799","lng": "102.836506"}
,{"code": "VL207030800","name": "Sek Sâk Thmei","lat": "12.779578","lng": "102.885051"}
,{"code": "VL207030900","name": "Tuek Sab Thmei","lat": "12.804525","lng": "102.842051"}
,{"code": "VL207031000","name": "Chamkar Kaosou","lat": "12.798167","lng": "102.8217"}
,{"code": "VL207030701","name": "Ou Ta Chan","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "20704"
								,"name": "Traeng"
								,"villages": [
									{"code": "VL207040100","name": "Kilou","lat": "12.834281","lng": "102.908169"}
,{"code": "VL207040200","name": "Phcheav","lat": "12.833043","lng": "102.894696"}
,{"code": "VL207040201","name": "Roka Pheng","lat": "12.841169","lng": "102.885219"}
,{"code": "VL207040300","name": "Chea Montrei","lat": "12.845471","lng": "102.91865"}
,{"code": "VL207040301","name": "Bon Run","lat": "12.842008","lng": "102.915596"}
,{"code": "VL207040400","name": "Chi Sang","lat": "12.850743","lng": "102.842989"}
,{"code": "VL207040401","name": "Srong Toch","lat": "12.850348","lng": "102.833988"}
,{"code": "VL207040500","name": "Kilou Samprambei","lat": "12.875157","lng": "102.947053"}
,{"code": "VL207040600","name": "Svay Sar","lat": "12.851943","lng": "102.813304"}
,{"code": "VL207040700","name": "Ta Krok","lat": "12.845823","lng": "102.773203"}
,{"code": "VL207040701","name": "Ta Krok (M)","lat": "12.847146","lng": "102.782662"}
,{"code": "VL207040800","name": "Srae Sdau","lat": "12.958589","lng": "102.749004"}
,{"code": "VL207040900","name": "Phum Thmei","lat": "12.838993","lng": "102.778156"}
,{"code": "VL207040202","name": "Boeng Koki","lat": "12.88596","lng": "102.86443"}

								]
							}
						]
					}
					,{
						"code":  "208"
						,"name":  "Sangkae"
						,"communes": [		
							{
								"code": "20801"
								,"name": "Anlong Vil"
								,"villages": [
									{"code": "VL208010100","name": "Chrab Veal","lat": "13.085511","lng": "103.22888"}
,{"code": "VL208010200","name": "Beng","lat": "13.082631","lng": "103.237255"}
,{"code": "VL208010300","name": "Anlong Vil","lat": "13.078131","lng": "103.240053"}
,{"code": "VL208010400","name": "Ou Muni Muoy","lat": "13.098374","lng": "103.250108"}
,{"code": "VL208010500","name": "Ou Muni Pir","lat": "13.105327","lng": "103.251848"}
,{"code": "VL208010600","name": "Chumnik","lat": "13.076392","lng": "103.250208"}
,{"code": "VL208010700","name": "Puk Chhma","lat": "13.054543","lng": "103.267298"}
,{"code": "VL208010800","name": "Spong","lat": "13.083598","lng": "103.246469"}
,{"code": "VL208010900","name": "Svay Kang","lat": "13.066121","lng": "103.257758"}

								]
							}
							,{
								"code": "20802"
								,"name": "Norea"
								,"villages": [
									{"code": "VL208020100","name": "Norea Muoy","lat": "13.11767","lng": "103.215592"}
,{"code": "VL208020200","name": "Norea Pir","lat": "13.112318","lng": "103.216756"}
,{"code": "VL208020300","name": "Balat","lat": "13.112383","lng": "103.226171"}
,{"code": "VL208020400","name": "Ta Kok","lat": "13.115893","lng": "103.224052"}

								]
							}
							,{
								"code": "20803"
								,"name": "Ta Pun"
								,"villages": [
									{"code": "VL208030100","name": "Boeng Tuem","lat": "13.159336","lng": "103.354773"}
,{"code": "VL208030200","name": "Svay Sa","lat": "13.142864","lng": "103.323523"}
,{"code": "VL208030300","name": "Samdach","lat": "13.12654","lng": "103.315333"}
,{"code": "VL208030400","name": "Basaet","lat": "13.115621","lng": "103.304341"}
,{"code": "VL208030500","name": "Ta Pon","lat": "13.115134","lng": "103.288123"}

								]
							}
							,{
								"code": "20804"
								,"name": "Roka"
								,"villages": [
									{"code": "VL208040100","name": "Chhung Tradak","lat": "13.110334","lng": "103.297627"}
,{"code": "VL208040200","name": "Pou Batdambang","lat": "13.105624","lng": "103.29611"}
,{"code": "VL208040300","name": "Ambaeng Thngae","lat": "13.102827","lng": "103.283219"}
,{"code": "VL208040400","name": "Roka","lat": "13.090124","lng": "103.27593"}
,{"code": "VL208040500","name": "Ta Haen Muoy","lat": "13.086477","lng": "103.271345"}
,{"code": "VL208040600","name": "Ta Haen Pir","lat": "13.078142","lng": "103.267023"}

								]
							}
							,{
								"code": "20805"
								,"name": "Kampong Preah"
								,"villages": [
									{"code": "VL208050100","name": "Prey Chaek","lat": "13.044113","lng": "103.289156"}
,{"code": "VL208050200","name": "Panhnha","lat": "13.036242","lng": "103.282628"}
,{"code": "VL208050300","name": "Kralanh","lat": "13.055139","lng": "103.333272"}
,{"code": "VL208050400","name": "Kampong Preah","lat": "13.027521","lng": "103.306233"}
,{"code": "VL208050500","name": "Andoung Trach","lat": "13.040293","lng": "103.331269"}
,{"code": "VL208050600","name": "Srah Kaev","lat": "13.013075","lng": "103.312858"}

								]
							}
							,{
								"code": "20806"
								,"name": "Kampong Prieng"
								,"villages": [
									{"code": "VL208060100","name": "Sambok Ak","lat": "12.936733","lng": "103.317538"}
,{"code": "VL208060200","name": "Sala Trav","lat": "12.936136","lng": "103.361427"}
,{"code": "VL208060300","name": "Kach Roteh","lat": "12.949697","lng": "103.36026"}
,{"code": "VL208060400","name": "Thmei","lat": "12.952662","lng": "103.33743"}
,{"code": "VL208060500","name": "Os Tuk","lat": "12.965433","lng": "103.352977"}
,{"code": "VL208060600","name": "Kbal Thnal","lat": "12.969622","lng": "103.318239"}

								]
							}
							,{
								"code": "20807"
								,"name": "Reang Kesei"
								,"villages": [
									{"code": "VL208070100","name": "Tuol Snuol","lat": "12.923236","lng": "103.232381"}
,{"code": "VL208070200","name": "Voat Kandal","lat": "12.929778","lng": "103.271195"}
,{"code": "VL208070300","name": "Reang Kesei","lat": "12.969801","lng": "103.260172"}
,{"code": "VL208070400","name": "Reang Kraol","lat": "12.971847","lng": "103.296103"}
,{"code": "VL208070500","name": "Prey Svay","lat": "12.9515","lng": "103.227122"}
,{"code": "VL208070600","name": "Svay Cheat","lat": "12.928938","lng": "103.253627"}
,{"code": "VL208070700","name": "Boeng Veaeng","lat": "12.968324","lng": "103.252809"}
,{"code": "VL208070800","name": "Damnak Dangkao","lat": "12.979762","lng": "103.262868"}
,{"code": "VL208070900","name": "Kakaoh Kambot","lat": "12.962048","lng": "103.243075"}

								]
							}
							,{
								"code": "20808"
								,"name": "Ou Dambang Muoy"
								,"villages": [
									{"code": "Vl208080100","name": "Voat Ta Moem","lat": "13.069981","lng": "103.207545"}
,{"code": "VL208080200","name": "Baoh Pou","lat": "13.059845","lng": "103.209757"}
,{"code": "VL208080300","name": "Ou Khcheay","lat": "13.037282","lng": "103.214529"}
,{"code": "VL208080400","name": "Ou Sralau","lat": "13.010767","lng": "103.23899"}
,{"code": "VL208080500","name": "Voat Chaeng","lat": "13.023179","lng": "103.245927"}
,{"code": "VL208080600","name": "Samraong Kaong","lat": "13.01173","lng": "103.249031"}

								]
							}
							,{
								"code": "20809"
								,"name": "Ou Dambang Pir"
								,"villages": [
									,{"code": "VL208090100","name": "Ou Dambang","lat": "13.064492","lng": "103.228164"}
,{"code": "VL208090200","name": "Svay Chrum","lat": "13.069959","lng": "103.234579"}
,{"code": "VL208090300","name": "Kampong Mdaok","lat": "13.076241","lng": "103.22808"}
,{"code": "VL208090400","name": "Svay Thum","lat": "13.051984","lng": "103.256354"}
,{"code": "VL208090500","name": "Dambouk Khpos","lat": "13.042515","lng": "103.267778"}
,{"code": "VL208090600","name": "Tuol Lvieng","lat": "13.029411","lng": "103.253304"}

								]
							}
							,{
								"code": "20810"
								,"name": "Vaot Ta Moem"
								,"villages": [
									{"code": "VL208100100","name": "Kampong Ampil","lat": "13.049814","lng": "103.196922"}
,{"code": "VL208100200","name": "Kampong Chlang","lat": "13.024391","lng": "103.180513"}
,{"code": "VL208100300","name": "Ou Sralau","lat": "13.012802","lng": "103.203643"}
,{"code": "VL208100400","name": "Ou Khcheay","lat": "13.037256","lng": "103.210842"}
,{"code": "VL208100500","name": "Sla Kram","lat": "13.029133","lng": "103.199432"}
,{"code": "VL208100600","name": "Anlong Lvea","lat": "13.001725","lng": "103.17054"}

								]
							}
						]
					}
					,{
						"code":  "209"
						,"name":  "Samlout"
						,"communes": [		
							{
								"code": "20901"
								,"name": "Ta Taok"
								,"villages": [
									{"code": "VL209010100","name": "Peam Ta","lat": "12.440692","lng": "102.809969"}
,{"code": "VL209010200","name": "Ou Traeng","lat": "12.45056","lng": "102.823257"}
,{"code": "VL209010300","name": "Veal Rolueum","lat": "12.455241","lng": "102.82662"}
,{"code": "VL209010400","name": "Ta Taok","lat": "12.480385","lng": "102.832637"}
,{"code": "VL209010500","name": "Ou Nonoung","lat": "12.477646","lng": "102.821283"}
,{"code": "VL209010600","name": "Peam","lat": "12.486656","lng": "102.821291"}
,{"code": "VL209010700","name": "Ou Ta Teak","lat": "12.493168","lng": "102.820841"}
,{"code": "VL209010701","name": "Ou ta teak (M)","lat": "12.493168","lng": "102.820841"}
,{"code": "VL209010800","name": "Ou Krouch","lat": "12.5146","lng": "102.846222"}
,{"code": "VL209010900","name": "Phnum Rai","lat": "12.514638","lng": "102.795137"}
,{"code": "VL209010901","name": "Phnum Rai(M)","lat": "12.514638","lng": "102.795137"}
,{"code": "VL209011000","name": "Ou Thma","lat": "12.541793","lng": "102.831273"}

								]
							}
							,{
								"code": "20902"
								,"name": "Kampong Lpov"
								,"villages": [
									{"code": "VL209020100","name": "Svay Chrum","lat": "12.546673","lng": "102.870031"}
,{"code": "VL209020200","name": "Kampong Lpov","lat": "12.548718","lng": "102.871412"}
,{"code": "VL209020300","name": "Kandal","lat": "12.563166","lng": "102.918269"}
,{"code": "VL209020400","name": "Ou Daem Chek","lat": "12.537424","lng": "102.875203"}
,{"code": "VL209020500","name": "Prey Thum","lat": "12.579756","lng": "103.00583"}
,{"code": "VL209020501","name": "T","lat": "12.579756","lng": "103.00583"}
,{"code": "VL209020502","name": "Kralok Mai Ko","lat": "12.579756","lng": "103.00583"}
,{"code": "VL209020600","name": "Stueng Touch","lat": "12.591259","lng": "102.965807"}
,{"code": "VL209020700","name": "Ou Choam Leu","lat": "12.544971","lng": "102.92847"}
,{"code": "VL209020800","name": "Ou Choam Kandal","lat": "12.547554","lng": "102.92247"}
,{"code": "VL209020900","name": "Ou Choam Kraom","lat": "12.577892","lng": "102.91654"}
,{"code": "VL209021000","name": "Veal Chambaing","lat": "12.577722","lng": "103.004148"}

								]
							}
							,{
								"code": "20903"
								,"name": "Ou Samrel"
								,"villages": [
									{"code": "VL209030100","name": "Ou Samrel Leu","lat": "12.717937","lng": "102.920025"}
,{"code": "VL209030200","name": "Ou Samrel Kraom","lat": "12.716995","lng": "102.880937"}
,{"code": "VL209030300","name": "Ou Rumchek Leu","lat": "12.71664","lng": "102.910232"}
,{"code": "VL209030400","name": "Ou Rumchek Kraom","lat": "12.710545","lng": "102.945659"}
,{"code": "VL209030500","name": "Chamlong Romeang Leu","lat": "12.708056","lng": "102.955704"}
,{"code": "VL209030501","name": "Tumnub Achây(M)","lat": "12.659681","lng": "102.975817"}
,{"code": "VL209030600","name": "Chamlong Romeang Kraom","lat": "12.716445","lng": "102.952405"}

								]
							}
							,{
								"code": "20904"
								,"name": "Sung"
								,"villages": [
									{"code": "VL209040100","name": "Sung Muoy","lat": "12.579824","lng": "102.764948"}
,{"code": "VL209040200","name": "Sung Pir","lat": "12.589554","lng": "102.762463"}
,{"code": "VL209040300","name": "Kandal","lat": "12.601091","lng": "102.764369"}
,{"code": "VL209040400","name": "Srae Reach","lat": "12.601754","lng": "102.753948"}
,{"code": "VL209040500","name": "Chamkar Chek","lat": "12.572219","lng": "102.764306"}
,{"code": "VL209040600","name": "Kanhchang","lat": "12.579157","lng": "102.800089"}
,{"code": "VL209040900","name": "Kanhchaing Khnong","lat": "12.610358","lng": "102.807022"}

								]
							}
							,{
								"code": "20905"
								,"name": "Samlout"
								,"villages": [
									{"code": "VL209050100","name": "Srae Andoung Muoy","lat": "12.570106","lng": "102.738759"}
,{"code": "VL209050200","name": "Chhak Rokar","lat": "12.57063","lng": "102.740888"}
,{"code": "VL209050201","name": "Chhak Rokar (M)","lat": "12.57063","lng": "102.740888"}
,{"code": "VL209050300","name": "Samlout","lat": "12.670363","lng": "102.739424"}
,{"code": "VL209050301","name": "O Ta Teung","lat": "12.650849","lng": "102.762118"}
,{"code": "VL209050302","name": "O Ta Teung(M)","lat": "12.670363","lng": "102.739424"}
,{"code": "VL209050400","name": "Kantuot","lat": "12.657347","lng": "102.763622"}
,{"code": "VL209050500","name": "Ou Chrab","lat": "12.577829","lng": "102.734073"}
,{"code": "VL209050600","name": "Boeung Run","lat": "12.645585","lng": "102.76089"}
,{"code": "VL209050601","name": "Kbal Prolean","lat": "12.643776","lng": "102.777511"}
,{"code": "VL209050700","name": "Ou Ta Noeng(Bâ Lang)","lat": "12.654773","lng": "102.707145"}

								]
							}
							,{
								"code": "20906"
								,"name": "Mean Chey"
								,"villages": [
									{"code": "VL209060100","name": "Kampong Tuk","lat": "12.728081","lng": "102.775974"}
,{"code": "VL209060101","name": "VL209060101","lat": "12.728081","lng": "102.775974"}
,{"code": "VL209060102","name": "Kampong Tuk (M)","lat": "12.728081","lng": "102.775974"}
,{"code": "VL209060200","name": "Kamchat","lat": "12.690536","lng": "102.818741"}
,{"code": "VL209060300","name": "Srae Sdau","lat": "12.746377","lng": "102.863302"}
,{"code": "VL209060400","name": "Ampoep","lat": "12.717255","lng": "102.830517"}
,{"code": "VL209060500","name": "Srae Chipov","lat": "12.726911","lng": "102.865472"}
,{"code": "VL209060600","name": "Ta Non","lat": "12.719089","lng": "102.820477"}

								]
							}
							,{
								"code": "20907"
								,"name": "Ta Sanh"
								,"villages": [
									{"code": "VL209070100","name": "Ou Snguot","lat": "12.632075","lng": "102.864412"}
,{"code": "VL209070200","name": "Prey Rumchek","lat": "12.654515","lng": "102.866701"}
,{"code": "VL209070201","name": "Prey Russei(M)","lat": "12.654515","lng": "102.866701"}
,{"code": "VL209070202","name": "Son prambun(M)","lat": "12.654515","lng": "102.866701"}
,{"code": "VL209070300","name": "Ou Tontuem","lat": "12.608921","lng": "102.858669"}
,{"code": "VL209070400","name": "Ta Sanh Khang Chheung","lat": "12.598374","lng": "102.854073"}
,{"code": "VL209070500","name": "Ta Sanh Khang Tboung","lat": "12.577909","lng": "102.821012"}
,{"code": "VL209070600","name": "Anlong Puok","lat": "12.598736","lng": "102.849552"}
,{"code": "VL209070700","name": "Doun Tret","lat": "12.6638","lng": "102.945279"}
,{"code": "VL209070701","name": "Troneab malou(M)","lat": "12.6638","lng": "102.945279"}
,{"code": "VL209070800","name": "Srae Trach","lat": "12.599536","lng": "102.894494"}
,{"code": "VL209070900","name": "Chamkar Stueng","lat": "12.615781","lng": "102.906618"}

								]
							}
						]
					}
					,{
						"code":  "210"
						,"name":  "Sampov Lun"
						,"communes": [		
							{
								"code": "21001"
								,"name": "Sampov Lun"
								,"villages": [
									{"code": "VL210010100","name": "Thnal Bat","lat": "13.391988","lng": "102.367188"}
,{"code": "VL210010101","name": "heng dan","lat": "13.391988","lng": "102.367188"}
,{"code": "VL210010200","name": "Thnal Bambaek","lat": "13.393587","lng": "102.36455"}
,{"code": "VL210010300","name": "Kaoh Touch","lat": "13.391896","lng": "102.362741"}
,{"code": "VL210010400","name": "Tuol Chrey","lat": "13.397628","lng": "102.368382"}
,{"code": "VL210010401","name": "Ou toek sa oy","lat": "13.397628","lng": "102.368382"}

								]
							}
							,{
								"code": "21002"
								,"name": "Angkor Ban"
								,"villages": [
									{"code": "VL210020100","name": "Kbal Hong","lat": "13.386776","lng": "102.361164"}
,{"code": "VL210020200","name": "Pralay Prak","lat": "13.385129","lng": "102.360084"}
,{"code": "VL210020300","name": "Andoung Pir","lat": "13.38397","lng": "102.360632"}
,{"code": "VL210020400","name": "Tuek Phos","lat": "13.383581","lng": "102.358818"}
,{"code": "VL210020500","name": "Tuek Thla","lat": "13.383069","lng": "102.359977"}

								]
							}
							,{
								"code": "21003"
								,"name": "Ta Sda"
								,"villages": [
									{"code": "VL210030100","name": "Veal Vong","lat": "13.423014","lng": "102.404171"}
,{"code": "VL210030101","name": "Veal Vong Keut","lat": "13.424042","lng": "102.394352"}
,{"code": "VL210030102","name": "Veal vong","lat": "13.424042","lng": "102.394352"}
,{"code": "VL210030200","name": "Ta Sda","lat": "13.42599","lng": "102.374911"}
,{"code": "VL210030300","name": "Chamkar Lhong","lat": "13.417637","lng": "102.370019"}
,{"code": "VL210030400","name": "Koun Phnum Cheung","lat": "13.406481","lng": "102.369208"}
,{"code": "VL210030500","name": "Koun Phnum Tboung","lat": "13.402311","lng": "102.371302"}
,{"code": "VL210030600","name": "Ou Choamnoab","lat": "13.39405","lng": "102.498907"}

								]
							}
							,{
								"code": "21004"
								,"name": "Santepheap"
								,"villages": [
									{"code": "VL210040100","name": "Ou","lat": "13.439715","lng": "102.360475"}
,{"code": "VL210040200","name": "Kilou Dabbei","lat": "13.437425","lng": "102.359983"}
,{"code": "VL210040300","name": "Boeng Prolit","lat": "13.39405","lng": "102.498907"}
,{"code": "VL210040400","name": "Kandoal","lat": "13.386424","lng": "102.508906"}

								]
							}
							,{
								"code": "21005"
								,"name": "Serei Mean Chey"
								,"villages": [
									{"code": "VL210050100","name": "Sralau Chrum","lat": "13.461306","lng": "102.358734"}
,{"code": "VL210050200","name": "Chheu Teal","lat": "13.453105","lng": "102.360651"}
,{"code": "VL210050201","name": "Damnak Cheak","lat": "13.452311","lng": "102.359831"}
,{"code": "VL210050300","name": "Pou Chrey","lat": "13.446585","lng": "102.360843"}
,{"code": "VL210050400","name": "Ou Trav Chu","lat": "13.402647","lng": "102.547323"}
,{"code": "VL210050401","name": "Tlok Sanke","lat": "13.402448","lng": "102.547263"}
,{"code": "VL210050500","name": "Ou Krous","lat": "13.37833","lng": "102.681845"}
,{"code": "VL210050600","name": "Kamnor Beng","lat": "13.384422","lng": "102.655659"}
,{"code": "VL210050700","name": "Ou Korki","lat": "13.39429","lng": "102.612343"}
,{"code": "VL210050800","name": "Toul Krasang","lat": "13.369835","lng": "102.61849"}

								]
							}
							,{
								"code": "21006"
								,"name": "Chrey Seima"
								,"villages": [
									{"code": "VL210060100","name": "Ou Lvea","lat": "13.473766","lng": "102.35988"}
,{"code": "VL210060101","name": "Phnom Russei","lat": "13.495931","lng": "102.364596"}
,{"code": "VL210060200","name": "Spean Youl","lat": "13.46688","lng": "102.358784"}
,{"code": "VL210060203","name": "Ou Kach","lat": "13.440866","lng": "102.520676"}
,{"code": "VL210060300","name": "Reaksmei","lat": "13.479939","lng": "102.359323"}
,{"code": "VL210060301","name": "chamkar Tabun","lat": "13.479939","lng": "102.359323"}
,{"code": "VL210060400","name": "Kilou Prambuon","lat": "13.476707","lng": "102.359525"}
,{"code": "VL210060500","name": "Chambak","lat": "13.470652","lng": "102.360099"}
,{"code": "VL210060600","name": "Damnak Chek","lat": "13.423336","lng": "102.505803"}
,{"code": "VL210060700","name": "O Thma","lat": "13.436617","lng": "102.511204"}
,{"code": "VL210060800","name": "Kbal Chrab","lat": "13.405663","lng": "102.509345"}
,{"code": "VL210061100","name": "Damnak Chann","lat": "13.449032","lng": "102.423424"}
,{"code": "VL210061200","name": "Sror lao Chrum","lat": "0","lng": "0"}

								]
							}

						]
					}
					,{
						"code":  "211"
						,"name":  "Phnom Proek"
						,"communes": [		
							{
								"code": "21101"
								,"name": "Phnom Proek"
								,"villages": [
									{"code": "VL211010100","name": "Tuol Khpos","lat": "13.321718","lng": "102.359703"}
,{"code": "VL211010200","name": "Beng S'at","lat": "13.308061","lng": "102.363393"}
,{"code": "VL211010300","name": "Phnum Proek","lat": "13.294845","lng": "102.373111"}
,{"code": "VL211010302","name": "Koul Samyong","lat": "13.298679","lng": "102.370839"}
,{"code": "VL211010303","name": "Ou Yeay Ta","lat": "13.265421","lng": "102.427955"}
,{"code": "VL211010400","name": "Sralau","lat": "13.324037","lng": "102.35858"}
,{"code": "VL211010500","name": "Kokir","lat": "13.331138","lng": "102.353448"}
,{"code": "VL211010600","name": "Ou Thum","lat": "13.267026","lng": "102.537327"}

								]
							}
							,{
								"code": "21102"
								,"name": "Pech Chenda"
								,"villages": [
									{"code": "VL211020100","name": "Ou","lat": "13.223351","lng": "102.38369"}
,{"code": "VL211020101","name": "Phnom Pralean","lat": "13.24774","lng": "102.428814"}
,{"code": "VL211020200","name": "Phnom Touch","lat": "13.224143","lng": "102.38867"}
,{"code": "VL211020300","name": "Pech Chenda","lat": "13.2001","lng": "102.406122"}
,{"code": "VL211020400","name": "Ou Tasok","lat": "13.237804","lng": "102.447813"}
,{"code": "VL211020401","name": "Tuek Chenh","lat": "13.265055","lng": "102.427525"}
,{"code": "VL211020500","name": "Ou Tapon","lat": "13.232812","lng": "102.494685"}
,{"code": "VL211020600","name": "Snoul","lat": "13.227708","lng": "102.505832"}
,{"code": "VL211020700","name": "Samaki","lat": "13.213829","lng": "102.530825"}
,{"code": "VL211020800","name": "Anlong Mean","lat": "13.233283","lng": "102.555457"}
,{"code": "VL211021200","name": "Kâkoh","lat": "13.2586","lng": "102.496969"}
,{"code": "VL211021400","name": "Ou Ta Ni","lat": "13.264575","lng": "102.410468"}

								]
							}
							,{
								"code": "21104"
								,"name": "Barang Thleak"
								,"villages": [
									{"code": "VL211030100","name": "Tuol","lat": "13.379764","lng": "102.358371"}
,{"code": "VL211030200","name": "Chamkar Trab","lat": "13.37352","lng": "102.353908"}
,{"code": "VL211030300","name": "Hong Tuek","lat": "13.370458","lng": "102.353102"}
,{"code": "VL211030400","name": "Chak Krei","lat": "13.375895","lng": "102.355599"}
,{"code": "VL211040100","name": "Tuol Chrey","lat": "13.342384","lng": "102.351665"}
,{"code": "VL211040200","name": "Ou Chaot","lat": "13.346449","lng": "102.349056"}
,{"code": "VL211040300","name": "Tuol Khvav","lat": "13.365873","lng": "102.353531"}
,{"code": "VL211040301","name": "Prakam Phean","lat": "13.367516","lng": "102.352536"}
,{"code": "VL211040400","name": "Barang Thleak","lat": "13.347394","lng": "102.348713"}
,{"code": "VL211040500","name": "Chamkar Srov","lat": "13.35697","lng": "102.349596"}
,{"code": "VL211040600","name": "Tuol Ampil","lat": "13.360952","lng": "102.350244"}
,{"code": "VL211040700","name": "Ou Kalsamyong","lat": "13.314085","lng": "102.497201"}
,{"code": "VL211040701","name": "Phnum Pom","lat": "13.352288","lng": "102.348532"}
,{"code": "VL211040800","name": "Toulkorkah","lat": "13.2799","lng": "102.494664"}
,{"code": "VL211040900","name": "Ou Chrey","lat": "13.274947","lng": "102.564302"}


								]
							}
							,{
								"code": "21103"
								,"name": "Chak Krey"
								,"villages": [
									{"code": "VL211030500","name": "Damnak Ksan","lat": "13.349308","lng": "102.549544"}
,{"code": "VL211030600","name": "Ou Dar","lat": "13.337389","lng": "102.56806"}
,{"code": "VL211030700","name": "Phnum Prampir","lat": "13.300824","lng": "102.609977"}
,{"code": "VL211030702","name": "sras brambey","lat": "13.300824","lng": "102.609977"}
,{"code": "VL211030704","name": "Phnom prampirknong/bos am","lat": "13.300824","lng": "102.609977"}
,{"code": "VL211030800","name": "Buor","lat": "13.286654","lng": "102.611638"}
,{"code": "VL211030900","name": "Anlong Krouch","lat": "13.282098","lng": "102.632697"}
,{"code": "VL211031000","name": "Anlong Sdey","lat": "13.276214","lng": "102.615119"}
,{"code": "VL211031100","name": "Spean Tumneap","lat": "13.27861","lng": "102.661965"}
,{"code": "VL211031200","name": "Damnak Beng","lat": "13.274595","lng": "102.661683"}
,{"code": "VL211031300","name": "Ou Chrey","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "21105"
								,"name": "Ou Rumduol"
								,"villages": [
									{"code": "VL211050100","name": "Samraong","lat": "13.241377","lng": "102.375225"}
,{"code": "VL211050200","name": "Ou Rumduol","lat": "13.249351","lng": "102.371377"}
,{"code": "VL211050300","name": "Ou Prayut","lat": "13.263844","lng": "102.369921"}
,{"code": "VL211050400","name": "Kandal","lat": "13.271207","lng": "102.373383"}
,{"code": "VL211050500","name": "Thnal Bat","lat": "13.273759","lng": "102.374693"}
,{"code": "VL211050600","name": "Ou Lhong","lat": "13.280586","lng": "102.384148"}
,{"code": "VL211050700","name": "Krouskrahom","lat": "13.239238","lng": "102.583924"}
,{"code": "VL211050701","name": "khyol phyos","lat": "13.239238","lng": "102.583924"}
,{"code": "VL211050702","name": "Ou Camlangsne","lat": "13.239238","lng": "102.583924"}

								]
							}
						]
					}
					,{
						"code":  "212"
						,"name":  "Kamrieng"
						,"communes": [		
							{
								"code": "21201"
								,"name": "Kamrieng"
								,"villages": [
									{"code": "VL212010100","name": "Kamrieng","lat": "13.046677","lng": "102.500195"}
,{"code": "VL212010200","name": "Svay Veaeng","lat": "13.048074","lng": "102.502605"}
,{"code": "VL212010300","name": "Svay Sa","lat": "13.04326","lng": "102.492535"}
,{"code": "VL212010400","name": "Sralau Tong","lat": "13.01917","lng": "102.561342"}
,{"code": "VL212010500","name": "Ou Chrey","lat": "13.012329","lng": "102.516434"}
,{"code": "VL212010600","name": "Roka Bos","lat": "13.021546","lng": "102.582495"}
,{"code": "VL212010700","name": "Lak Hokpir","lat": "12.992211","lng": "102.517675"}
,{"code": "VL212010800","name": "Boeng Ou Cheang","lat": "12.994266","lng": "102.538008"}

								]
							}
							,{
								"code": "21202"
								,"name": "Boeung Reang"
								,"villages": [
									{"code": "VL212020100","name": "Doung","lat": "13.091461","lng": "102.445641"}
,{"code": "VL212020200","name": "Ou Da Leu","lat": "13.084682","lng": "102.454402"}
,{"code": "VL212020300","name": "Ou Krouch","lat": "13.083418","lng": "102.463668"}
,{"code": "VL212020400","name": "Svay","lat": "13.051333","lng": "102.48744"}
,{"code": "VL212020500","name": "Svay Thum","lat": "13.084857","lng": "102.459322"}
,{"code": "VL212020600","name": "Boeung Reang","lat": "13.083219","lng": "102.468251"}
,{"code": "VL212020700","name": "Preah Puth","lat": "13.078954","lng": "102.486691"}

								]
							}
							,{
								"code": "21203"
								,"name": "Ou Da"
								,"villages": [
									{"code": "VL212030100","name": "Kandal (Ou Da)","lat": "13.089454","lng": "102.495276"}
,{"code": "VL212030200","name": "Svay Chrum","lat": "13.093178","lng": "102.4991"}
,{"code": "VL212030300","name": "Ou Kokir (Ou Da)","lat": "13.106166","lng": "102.517674"}
,{"code": "VL212030400","name": "Ou Da","lat": "13.087611","lng": "102.488787"}
,{"code": "VL212030500","name": "Thmei","lat": "13.077065","lng": "102.488525"}
,{"code": "VL212030600","name": "Kampong Lei","lat": "13.081341","lng": "102.582439"}
,{"code": "VL212030700","name": "Lumphat","lat": "13.110063","lng": "102.529026"}
,{"code": "VL212030800","name": "Manaos Kal","lat": "13.100007","lng": "102.612418"}
,{"code": "VL212030900","name": "Samraong","lat": "13.064578","lng": "102.537193"}
,{"code": "VL212031000","name": "Tang Yu","lat": "13.128427","lng": "102.570308"}

								]
							}
							,{
								"code": "21204"
								,"name": "Trang"
								,"villages": [
									{"code": "VL212040100","name": "Trang","lat": "13.108804","lng": "102.43619"}
,{"code": "VL212040200","name": "Kandal","lat": "13.116589","lng": "102.430495"}
,{"code": "VL212040300","name": "Svay Prey","lat": "13.12523","lng": "102.423714"}
,{"code": "VL212040400","name": "Thmei","lat": "13.104594","lng": "102.438049"}
,{"code": "VL212040500","name": "Lvea Te","lat": "13.15885","lng": "102.509121"}
,{"code": "VL212040600","name": "Ta Saen","lat": "13.119784","lng": "102.425651"}
,{"code": "VL212040700","name": "Ou Kokir (Trang)","lat": "13.136318","lng": "102.466051"}
,{"code": "VL212040800","name": "Ou Chambak","lat": "13.143141","lng": "102.473326"}
,{"code": "VL212040900","name": "Phnum Muoyrouy","lat": "13.145951","lng": "102.483438"}

								]
							}
							,{
								"code": "21205"
								,"name": "Ta Saen"
								,"villages": [
									,{"code": "VL212050100","name": "Dei Kraham","lat": "13.179968","lng": "102.413756"}
,{"code": "VL212050200","name": "Ou Chamlang","lat": "13.145964","lng": "102.412933"}
,{"code": "VL212050300","name": "Ou Anlok","lat": "13.18924","lng": "102.405102"}
,{"code": "VL212050400","name": "Ou Tuek Thla","lat": "13.179592","lng": "102.505223"}
,{"code": "VL212050500","name": "Samaki","lat": "13.187294","lng": "102.546832"}
,{"code": "VL212050501","name": "Sam maki 2","lat": "13.187294","lng": "102.546832"}
,{"code": "VL212050600","name": "Ou Tuek Thla (Trachakchetr)","lat": "13.191991","lng": "102.501898"}
,{"code": "VL212050700","name": "Ou Trorchakchet","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "21206"
								,"name": "Ta Krey"
								,"villages": [
									{"code": "VL212060100","name": "Damnak Sala","lat": "13.106112","lng": "102.732035"}
,{"code": "VL212060200","name": "Kampong Chamlang Leu","lat": "13.119777","lng": "102.63886"}
,{"code": "VL212060300","name": "Kampong Chamlang Kroam","lat": "13.092516","lng": "102.637793"}
,{"code": "VL212060400","name": "Kamprang","lat": "13.12446","lng": "102.656922"}
,{"code": "VL212060500","name": "Sras Tuek Thmei","lat": "13.114603","lng": "102.742007"}
,{"code": "VL212060501","name": "Plow Pramuy","lat": "13.149497","lng": "102.613814"}
,{"code": "VL212060600","name": "Phum Samseb","lat": "13.154253","lng": "102.61206"}
,{"code": "VL212060700","name": "Sras Kampaok","lat": "13.148809","lng": "102.685597"}
,{"code": "VL212060800","name": "Ta Krei","lat": "13.105544","lng": "102.707638"}
,{"code": "VL212060900","name": "Tuol Til","lat": "13.1135","lng": "102.688914"}

								]
							}
						]
					}
					,{
						"code":  "213"
						,"name":  "Koas Krala"
						,"communes": [		
							{
								"code": "21301"
								,"name": "Thipakdei"
								,"villages": [
									{"code": "VL213010100","name": "Ra","lat": "12.863166","lng": "103.274775"}
,{"code": "VL213010200","name": "Samraong","lat": "12.874172","lng": "103.318758"}
,{"code": "VL213010300","name": "Chhay Ballangk","lat": "12.846913","lng": "103.262266"}
,{"code": "VL213010400","name": "Cheung Tinh","lat": "12.860305","lng": "103.265914"}
,{"code": "VL213010500","name": "Ta Thok","lat": "12.864944","lng": "103.240455"}
,{"code": "VL213010600","name": "Kantuot","lat": "12.874958","lng": "103.263279"}
,{"code": "VL213010700","name": "Kouk Poun","lat": "12.892002","lng": "103.257238"}
,{"code": "VL213010800","name": "Boeng Snao","lat": "12.865436","lng": "103.287409"}
,{"code": "VL213010900","name": "Tuol Mtes","lat": "12.870578","lng": "103.234086"}
,{"code": "VL213011000","name": "Koun Prum","lat": "12.874762","lng": "103.27465"}
,{"code": "VL213011100","name": "Boeng Reang","lat": "12.825056","lng": "103.264912"}

								]
							}
							,{
								"code": "21302"
								,"name": "Kaos Krala"
								,"villages": [
									{"code": "VL213020100","name": "Koas Krala","lat": "12.768103","lng": "103.263892"}
,{"code": "VL213020200","name": "Spean","lat": "12.76234","lng": "103.269926"}
,{"code": "VL213020300","name": "Voat","lat": "12.77029","lng": "103.263794"}
,{"code": "VL213020400","name": "Tuol Ballangk","lat": "12.771407","lng": "103.261816"}
,{"code": "VL213020500","name": "Tuol Ta Muem","lat": "12.751754","lng": "103.272577"}
,{"code": "VL213020600","name": "Thmei","lat": "12.751568","lng": "103.262163"}
,{"code": "VL213020700","name": "Prey Popel","lat": "12.75762","lng": "103.257416"}
,{"code": "VL213020800","name": "Boeung Chhneah","lat": "12.744392","lng": "103.249854"}
,{"code": "VL213020900","name": "Damnak Kakaoh","lat": "12.739635","lng": "103.248128"}

								]
							}
							,{
								"code": "21303"
								,"name": "Hab"
								,"villages": [
									{"code": "VL213030100","name": "Hab","lat": "12.802014","lng": "103.300807"}
,{"code": "VL213030200","name": "Chambak","lat": "12.791132","lng": "103.300889"}
,{"code": "VL213030300","name": "Sambour","lat": "12.788154","lng": "103.297482"}
,{"code": "VL213030400","name": "Sameakki","lat": "12.783414","lng": "103.278864"}
,{"code": "VL213030500","name": "Trapeang Dang Tuek","lat": "12.789669","lng": "103.280212"}
,{"code": "VL213030600","name": "Kouk Trom","lat": "12.819682","lng": "103.32555"}
,{"code": "VL213030700","name": "Klaeng Chuor","lat": "12.774565","lng": "103.31532"}

								]
							}
							,{
								"code": "21304"
								,"name": "Preah Phos"
								,"villages": [
									{"code": "VL213040100","name": "Sach Hab","lat": "12.749442","lng": "103.303506"}
,{"code": "VL213040200","name": "Boeng Preah","lat": "12.742497","lng": "103.275107"}
,{"code": "VL213040300","name": "Prey Phdau","lat": "12.720885","lng": "103.273799"}
,{"code": "VL213040400","name": "Kab Prich","lat": "12.735669","lng": "103.271875"}
,{"code": "VL213040500","name": "Ta Khao","lat": "12.735932","lng": "103.285916"}
,{"code": "VL213040600","name": "Koy Veaeng","lat": "12.693444","lng": "103.247911"}
,{"code": "VL213040700","name": "Prey Chak","lat": "12.687969","lng": "103.280115"}
,{"code": "VL213040800","name": "Ta Nuot","lat": "12.656762","lng": "103.255995"}
,{"code": "VL213040801","name": "A Rei","lat": "","lng": ""}
,{"code": "VL213040900","name": "Boeang Preah Kralanh","lat": "12.707224","lng": "103.318509"}

								]
							}
							,{
								"code": "21305"
								,"name": "Doun Ba"
								,"villages": [
									{"code": "VL213050100","name": "Ba Srae","lat": "12.768139","lng": "103.250198"}
,{"code": "VL213050200","name": "Doun Ba","lat": "12.769006","lng": "103.244648"}
,{"code": "VL213050300","name": "Prey Phnheas","lat": "12.774524","lng": "103.252125"}
,{"code": "VL213050400","name": "Tuol Lieb","lat": "12.772634","lng": "103.235644"}
,{"code": "VL213050500","name": "Kuok Roka","lat": "12.768792","lng": "103.230191"}
,{"code": "VL213050502","name": "Anlong Mean","lat": "12.785083","lng": "103.152846"}
,{"code": "VL213050503","name": "Beng Preah Punley","lat": "12.782894","lng": "103.181236"}
,{"code": "VL213050504","name": "Chhâk Raka","lat": "","lng": ""}
,{"code": "VL213050505","name": "Krasaing Ben","lat": "12.772426","lng": "103.195447"}
,{"code": "VL213050506","name": "Kuok Roka (M)","lat": "12.768792","lng": "103.230191"}
,{"code": "VL213050507","name": "Trapeang Trea","lat": "12.811241","lng": "103.218409"}
,{"code": "VL213050508","name": "Tuol Ach Sva","lat": "12.787","lng": "103.19737"}
,{"code": "VL213050509","name": "Anlong Mean","lat": "12.804962","lng": "103.191108"}
,{"code": "VL213050517","name": "Tuol Veng","lat": "12.768792","lng": "103.230191"}
,{"code": "VL213050600","name": "Khlaeng Kong","lat": "12.760263","lng": "103.238851"}
,{"code": "VL213050700","name": "Khvaeng","lat": "12.754439","lng": "103.227574"}
,{"code": "VL213050800","name": "Prey Paen","lat": "12.749593","lng": "103.223381"}
,{"code": "VL213050518","name": "Toul Veng","lat": "12.768792","lng": "103.230191"}

								]
							}
							,{
								"code": "21306"
								,"name": "Chhnal Mean"
								,"villages": [
									{"code": "VL213060100","name": "Krang Svat","lat": "12.705345","lng": "103.204171"}
,{"code": "VL213060102","name": "Krang Svat (M)","lat": "12.868824","lng": "103.299566"}
,{"code": "VL213060200","name": "Banteay Char","lat": "12.721034","lng": "103.222613"}
,{"code": "VL213060300","name": "Prey Sen","lat": "12.663358","lng": "103.211894"}
,{"code": "VL213060400","name": "Prey Totueng","lat": "12.696008","lng": "103.185547"}
,{"code": "VL213060401","name": "Chlark","lat": "12.892002","lng": "103.257238"}
,{"code": "VL213060500","name": "Samraong","lat": "12.61938","lng": "103.185914"}
,{"code": "VL213060600","name": "Ruessei Preah","lat": "12.714298","lng": "103.227669"}
,{"code": "VL213060700","name": "Chhnal Mean","lat": "12.716146","lng": "103.216221"}

								]
							}
						]
					}
					,{
						"code":  "214"
						,"name":  "Rukhak Kiri"
						,"communes": [		
							{
								"code": "21401"
								,"name": "Preaek Chik"
								,"villages": [
									{"code": "VL214010100","name": "Siem","lat": "12.679304","lng": "103.411337"}
,{"code": "VL214010200","name": "Khnach Ampor","lat": "12.631328","lng": "103.380936"}
,{"code": "VL214010300","name": "Chhkae Kham Praeus","lat": "12.658516","lng": "103.405942"}
,{"code": "VL214010400","name": "Preaek Ta Ven","lat": "12.60229","lng": "103.343631"}
,{"code": "VL214010500","name": "Preaek Chik","lat": "12.584357","lng": "103.316294"}
,{"code": "VL214010600","name": "Ou Ramcheck","lat": "12.550557","lng": "103.348058"}
,{"code": "VL214010700","name": "Chhouk","lat": "12.609236","lng": "103.376693"}
,{"code": "VL214010701","name": "Bos Dong (Chhouk)","lat": "","lng": ""}
,{"code": "VL214010702","name": "Bos Dong (Chhouk) (M)","lat": "0","lng": "0"}
,{"code": "VL214010703","name": "Chak Krei (Chhouk)","lat": "","lng": ""}
,{"code": "VL214010704","name": "Ou Ramcheck (M)","lat": "12.607491","lng": "103.366157"}
,{"code": "VL214010800","name": "Thnom","lat": "12.631328","lng": "103.380936"}
,{"code": "VL214010900","name": "Kamraeng","lat": "12.611017","lng": "103.352982"}
,{"code": "VL214010901","name": "Thmei","lat": "","lng": ""}
,{"code": "VL214011000","name": "Ta Preal","lat": "12.60229","lng": "103.343631"}
,{"code": "VL214011100","name": "Chrang Khpos","lat": "12.584357","lng": "103.316294"}
,{"code": "VL214011101","name": "Phnom Pit (Chraing Khpos)","lat": "","lng": ""}
,{"code": "VL214011102","name": "Phnom Pit (Chraing Khpos) (M)","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "21402"
								,"name": "Prey Tralach"
								,"villages": [
									{"code": "VL214020100","name": "Chong Paor","lat": "12.624043","lng": "103.454306"}
,{"code": "VL214020200","name": "Kaoh Thum","lat": "12.555345","lng": "103.535948"}
,{"code": "VL214020300","name": "Mukh Rea","lat": "12.553313","lng": "103.578228"}
,{"code": "VL214020302","name": "muk rea2","lat": "12.553313","lng": "103.578228"}
,{"code": "VL214020400","name": "Paen","lat": "12.579336","lng": "103.470873"}
,{"code": "VL214020500","name": "Preah Andoung","lat": "12.606121","lng": "103.522204"}
,{"code": "VL214020600","name": "Prey Klout","lat": "12.602332","lng": "103.491189"}
,{"code": "VL214020700","name": "Prey Tralach","lat": "12.581021","lng": "103.454058"}
,{"code": "VL214020800","name": "Roung","lat": "12.55938","lng": "103.415463"}
,{"code": "VL214020802","name": "Roung 2","lat": "12.55938","lng": "103.415463"}
,{"code": "VL214020900","name": "Sdok Pravoek","lat": "12.539248","lng": "103.531493"}
,{"code": "VL214021000","name": "Srah Kuy","lat": "12.546732","lng": "103.561368"}
,{"code": "VL214021100","name": "Svay Yar","lat": "12.505748","lng": "103.565635"}
,{"code": "VL214021101","name": "Danghoa (M)","lat": "0","lng": "0"}
,{"code": "VL214021200","name": "Ta Priet","lat": "12.539897","lng": "103.605844"}
,{"code": "VL214021300","name": "Tuol Koki","lat": "12.602047","lng": "103.492"}
,{"code": "VL214021400","name": "Tuol Svay","lat": "12.5947","lng": "103.564682"}
,{"code": "VL214021500","name": "Prey Ampaon","lat": "12.551569","lng": "103.618233"}
,{"code": "VL214021501","name": "Srah Thot","lat": "","lng": ""}
,{"code": "VL214021600","name": "Pralay Dabprambei","lat": "12.591168","lng": "103.583966"}
,{"code": "VL214021700","name": "Danghoa","lat": "12.53754","lng": "103.529966"}
,{"code": "VL214021800","name": "Mokra Mouy","lat": "12.552257","lng": "103.576817"}
,{"code": "VL214022100","name": "Andoung Kontuot","lat": "0","lng": "0"}

								]
							}
						]
					}


				]
			}
			,{
				"code": "03"
				,"name": "Kampong Cham"
				,"districts":[
					{
						"code":  "301"
						,"name":  "Batheay"
						,"communes": [	
							{
								"code": "30101"
								,"name": "Batheay"
								,"villages": [
									{"code": "VL301010100","name": "Svay Pok","lat": "11.998373","lng": "104.950611"}
,{"code": "VL301010200","name": "Batheay","lat": "11.991834","lng": "104.943263"}
,{"code": "VL301010300","name": "Srah Pring","lat": "11.990462","lng": "104.961571"}
,{"code": "VL301010400","name": "Chreaek","lat": "11.999217","lng": "104.922464"}
,{"code": "VL301010500","name": "Tuol","lat": "11.979825","lng": "104.887537"}
,{"code": "VL301010600","name": "Ou Mal","lat": "11.943651","lng": "104.832052"}

								]
							}
							,{
								"code": "30102"
								,"name": "Chbar Ampov"
								,"villages": [
									{"code": "VL301020100","name": "Chbar Ampov","lat": "11.948331","lng": "104.973195"}
,{"code": "VL301020200","name": "Tuol Chan","lat": "11.924483","lng": "104.973749"}
,{"code": "VL301020300","name": "Anlong Chrey","lat": "11.94986","lng": "105.017538"}
,{"code": "VL301020400","name": "Stueng Chveng","lat": "11.921175","lng": "105.002245"}

								]
							}
							,{
								"code": "30103"
								,"name": "Chealea"
								,"villages": [
									{"code": "VL301030100","name": "Chea Lea","lat": "11.914682","lng": "104.928696"}
,{"code": "VL301030200","name": "Ta Ngil","lat": "11.90096","lng": "104.959536"}
,{"code": "VL301030300","name": "Tang Krang","lat": "11.89214","lng": "104.946727"}
,{"code": "VL301030400","name": "Baek Peang","lat": "11.922658","lng": "104.930209"}
,{"code": "VL301030500","name": "Phnum Thum","lat": "11.89524","lng": "104.93411"}

								]
							}
							,{
								"code": "30104"
								,"name": "Cheung Prey"
								,"villages": [
									{"code": "VL301040100","name": "Cheung Prey","lat": "12.058867","lng": "104.968499"}
,{"code": "VL301040200","name": "Andoung Snay","lat": "12.051713","lng": "104.967829"}
,{"code": "VL301040300","name": "Prasoutr Ka","lat": "12.053907","lng": "104.944822"}
,{"code": "VL301040400","name": "Prasoutr Kha","lat": "12.046564","lng": "104.943555"}
,{"code": "VL301040500","name": "Trabaek","lat": "12.062498","lng": "104.944563"}
,{"code": "VL301040600","name": "Trayang Pong","lat": "12.072754","lng": "104.946242"}

								]
							}
							,{
								"code": "30105"
								,"name": "Me Pring"
								,"villages": [
									{"code": "VL301050100","name": "Me Pring","lat": "12.025392","lng": "104.938185"}
,{"code": "VL301050200","name": "Tang Thlaeung","lat": "12.030529","lng": "104.936402"}
,{"code": "VL301050300","name": "Tang Srei","lat": "12.016486","lng": "104.942588"}
,{"code": "VL301050400","name": "Tang Roleang","lat": "12.028584","lng": "104.934951"}
,{"code": "VL301050500","name": "Prey Kaor","lat": "12.03903","lng": "104.939073"}

								]
							}
							,{
								"code": "30106"
								,"name": "Ph'av"
								,"villages": [
									{"code": "VL301060100","name": "Ph'av","lat": "12.027097","lng": "104.966086"}
,{"code": "VL301060200","name": "Samraong","lat": "12.033563","lng": "104.964918"}
,{"code": "VL301060300","name": "Tang Boeng","lat": "12.012601","lng": "104.966556"}
,{"code": "VL301060400","name": "Ba Kal","lat": "12.021572","lng": "104.965802"}
,{"code": "VL301060500","name": "Prey Nhea","lat": "12.038745","lng": "104.962722"}
,{"code": "VL301060600","name": "Kandaol","lat": "12.017014","lng": "104.965959"}

								]
							}
							,{
								"code": "30107"
								,"name": "Sambour"
								,"villages": [
									{"code": "VL301070100","name": "Sambour","lat": "11.875991","lng": "104.851137"}
,{"code": "VL301070200","name": "Balang","lat": "11.891549","lng": "104.877849"}
,{"code": "VL301070300","name": "Veal","lat": "11.892139","lng": "104.882303"}
,{"code": "VL301070400","name": "Sangkaeub","lat": "11.885424","lng": "104.892636"}
,{"code": "VL301070500","name": "Ta Poy","lat": "11.890612","lng": "104.91155"}
,{"code": "VL301070600","name": "Chong","lat": "11.88705","lng": "104.912864"}
,{"code": "VL301070700","name": "Ta Baek","lat": "11.888208","lng": "104.917161"}

								]
							}
							,{
								"code": "30108"
								,"name": "Sandaek"
								,"villages": [
									{"code": "VL301080100","name": "Kampal","lat": "12.121851","lng": "104.956838"}
,{"code": "VL301080200","name": "Pou Stieng","lat": "12.130471","lng": "104.969575"}
,{"code": "VL301080300","name": "Svay Prey","lat": "12.142473","lng": "104.984362"}
,{"code": "VL301080400","name": "Tang Chrey","lat": "12.12492","lng": "104.981569"}
,{"code": "VL301080500","name": "Sroeng","lat": "12.113652","lng": "104.981312"}

								]
							}
							,{
								"code": "30109"
								,"name": "Tang Krang"
								,"villages": [
									{"code": "VL301090100","name": "Phnum Del","lat": "11.88702","lng": "104.937418"}
,{"code": "VL301090200","name": "Cheung Chhnok","lat": "11.879622","lng": "104.93618"}
,{"code": "VL301090300","name": "Tboung Phnum","lat": "11.873545","lng": "104.936052"}
,{"code": "VL301090400","name": "Popit","lat": "11.857562","lng": "104.922642"}
,{"code": "VL301090500","name": "Ak Tieng","lat": "11.845897","lng": "104.926189"}
,{"code": "VL301090600","name": "Kampong Preah","lat": "11.876695","lng": "104.952993"}
,{"code": "VL301090700","name": "Tang Kouk","lat": "11.851694","lng": "104.925637"}
,{"code": "VL301090800","name": "Prasat","lat": "11.870858","lng": "104.929589"}

								]
							}
							,{
								"code": "30110"
								,"name": "Tang Krasang"
								,"villages": [
									{"code": "VL301100100","name": "Boeng Veaeng","lat": "12.075236","lng": "104.926927"}
,{"code": "VL301100200","name": "Kradas Ka","lat": "12.086912","lng": "104.932318"}
,{"code": "VL301100300","name": "Kradas Kha","lat": "12.084968","lng": "104.933605"}
,{"code": "VL301100400","name": "Sdok Thum","lat": "12.087975","lng": "104.953949"}
,{"code": "VL301100500","name": "Trav Phni","lat": "12.093537","lng": "104.955822"}
,{"code": "VL301100600","name": "Khvet","lat": "12.09776","lng": "104.953396"}
,{"code": "VL301100700","name": "Boeng","lat": "12.109199","lng": "104.952539"}
,{"code": "VL301100800","name": "Khtum","lat": "12.102716","lng": "104.955812"}
,{"code": "VL301100900","name": "Chan","lat": "12.098069","lng": "104.967612"}
,{"code": "VL301101000","name": "Chi Neang","lat": "12.106542","lng": "104.959459"}

								]
							}
							,{
								"code": "30111"
								,"name": "Trab"
								,"villages": [
									{"code": "VL301110100","name": "Roung Damrei","lat": "12.109772","lng": "104.92451"}
,{"code": "VL301110200","name": "Kampout","lat": "12.120615","lng": "104.926777"}
,{"code": "VL301110300","name": "Phnum Touch","lat": "12.12863","lng": "104.935735"}
,{"code": "VL301110400","name": "Tum Prong","lat": "12.134264","lng": "104.93884"}
,{"code": "VL301110500","name": "Thmei","lat": "12.139736","lng": "104.93883"}
,{"code": "VL301110600","name": "Pou Ruessei","lat": "12.147542","lng": "104.947339"}
,{"code": "VL301110700","name": "Trab","lat": "12.142034","lng": "104.944555"}
,{"code": "VL301110800","name": "Chan Kong","lat": "12.142813","lng": "104.952303"}
,{"code": "VL301110900","name": "Thkov","lat": "12.138736","lng": "104.96007"}
,{"code": "VL301111000","name": "Thma Kaev","lat": "12.143574","lng": "104.958406"}
,{"code": "VL301111100","name": "Rout","lat": "12.257257","lng": "104.968485"}

								]
							}
							,{
								"code": "30112"
								,"name": "Tumnob"
								,"villages": [
									{"code": "VL301120100","name": "Tumnob Leu","lat": "12.077099","lng": "104.974579"}
,{"code": "VL301120200","name": "Prayuk","lat": "12.080192","lng": "104.983162"}
,{"code": "VL301120300","name": "Doun Paen","lat": "12.088647","lng": "104.973264"}
,{"code": "VL301120400","name": "Rung","lat": "12.090094","lng": "104.981645"}
,{"code": "VL301120500","name": "Prasam","lat": "12.09864","lng": "104.98317"}
,{"code": "VL301120600","name": "Sroengk","lat": "12.105947","lng": "104.98758"}
,{"code": "VL301120700","name": "Trapeang Snao","lat": "12.085067","lng": "105.004048"}

								]
							}
						]
					}
					,{
						"code":  "302"
						,"name":  "Chamkar Leu"
						,"communes": [		
							{
								"code": "30201"
								,"name": "Bos Khnaor"
								,"villages": [
									{"code": "VL302010100","name": "Saray","lat": "12.173058","lng": "105.324144"}
,{"code": "VL302010200","name": "Doun Thi","lat": "12.128288","lng": "105.337269"}
,{"code": "VL302010300","name": "Thlok Kravan","lat": "12.1761","lng": "105.320627"}
,{"code": "VL302010400","name": "Veal Thnong","lat": "12.139981","lng": "105.336696"}
,{"code": "VL302010500","name": "Bos Khnaor","lat": "12.181581","lng": "105.320404"}
,{"code": "VL302010600","name": "Chranaom","lat": "12.159069","lng": "105.330837"}
,{"code": "VL302010700","name": "Prasaeur","lat": "12.178935","lng": "105.317202"}
,{"code": "VL302010800","name": "Dab Meakkakra","lat": "12.182536","lng": "105.323163"}
,{"code": "VL302010900","name": "Sameakki","lat": "12.174774","lng": "105.326095"}
,{"code": "VL302011000","name": "Chamkar Kabbas","lat": "12.197039","lng": "105.317095"}
,{"code": "VL302011100","name": "Samsebpram","lat": "12.198326","lng": "105.314752"}

								]
							}
							,{
								"code": "30202"
								,"name": "Chamkar Andoung"
								,"villages": [
									{"code": "VL302020100","name": "Chamkar Andoung","lat": "12.341489","lng": "105.181977"}
,{"code": "VL302020200","name": "Souchey","lat": "12.341217","lng": "105.16887"}
,{"code": "VL302020300","name": "Svay Chuor","lat": "12.341513","lng": "105.158614"}
,{"code": "VL302020400","name": "Ou Kravan","lat": "12.341209","lng": "105.151219"}
,{"code": "VL302020500","name": "Doun Bos","lat": "12.354709","lng": "105.154961"}
,{"code": "VL302020600","name": "Choam Chrey","lat": "12.365359","lng": "105.173199"}
,{"code": "VL302020700","name": "Praeus Meas","lat": "12.373106","lng": "105.178199"}
,{"code": "VL302020800","name": "Phum Lekh Pir","lat": "12.357235","lng": "105.204864"}
,{"code": "VL302020900","name": "Phum Dab Muoy","lat": "12.373336","lng": "105.185798"}
,{"code": "VL302021000","name": "Phum Sam Bei","lat": "12.339143","lng": "105.24463"}
,{"code": "VL302021100","name": "Phum Mphey Pir","lat": "12.371466","lng": "105.219501"}
,{"code": "VL302021200","name": "Ta Prok","lat": "12.331893","lng": "105.261409"}
,{"code": "VL302021300","name": "Lekh Muoy","lat": "12.340091","lng": "105.202864"}
,{"code": "VL302021400","name": "Sahak Kreas","lat": "12.324061","lng": "105.21077"}
,{"code": "VL302021500","name": "Sahak Kroan","lat": "12.290944","lng": "105.211544"}
,{"code": "VL302021600","name": "Sraong Chan","lat": "12.301791","lng": "105.193252"}
,{"code": "VL302021700","name": "Roung Chakr","lat": "12.357304","lng": "105.221228"}
,{"code": "VL302021800","name": "Kromhun","lat": "12.350964","lng": "105.22171"}
,{"code": "VL302021900","name": "Ta Pang 1","lat": "0","lng": "0"}
,{"code": "VL302022000","name": "Ta Pang 2","lat": "0","lng": "0"}
,{"code": "VL302022100","name": "Ta Pang 3","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "30203"
								,"name": "Cheyyou"
								,"villages": [
									{"code": "VL302030100","name": "Spueu Ka","lat": "12.324355","lng": "105.333085"}
,{"code": "VL302030200","name": "Cheyyou","lat": "12.308791","lng": "105.341223"}
,{"code": "VL302030300","name": "Ou Peh","lat": "12.317595","lng": "105.365174"}
,{"code": "VL302030400","name": "Trapeang Ruessei","lat": "12.328468","lng": "105.369658"}
,{"code": "VL302030500","name": "Trapeang Lpov","lat": "12.310245","lng": "105.383741"}

								]
							}
							,{
								"code": "30204"
								,"name": "Lvea Leu"
								,"villages": [
									{"code": "VL302040100","name": "Kbal Hong Thmei","lat": "12.331518","lng": "105.283777"}
,{"code": "VL302040200","name": "Kbal Hong Chas","lat": "12.328312","lng": "105.280122"}
,{"code": "VL302040300","name": "Kralaeng Kaeut","lat": "12.346121","lng": "105.285034"}
,{"code": "VL302040400","name": "Kralaeng Lech","lat": "12.344956","lng": "105.284086"}
,{"code": "VL302040500","name": "Lvea Cheung","lat": "12.34453","lng": "105.285116"}
,{"code": "VL302040600","name": "Lvea Tboung","lat": "12.333494","lng": "105.279981"}
,{"code": "VL302040700","name": "Phum Bei","lat": "12.362499","lng": "105.284785"}

								]
							}
							,{
								"code": "30205"
								,"name": "Spueu"
								,"villages": [
									{"code": "VL302050100","name": "Banteay Chey","lat": "12.328653","lng": "105.315321"}
,{"code": "VL302050200","name": "Popreng","lat": "12.348259","lng": "105.330356"}
,{"code": "VL302050300","name": "Ou Veay","lat": "12.357702","lng": "105.357374"}
,{"code": "VL302050400","name": "Peaeng Meas Cheung","lat": "12.339776","lng": "105.330648"}
,{"code": "VL302050500","name": "Peaeng Meas Tboung","lat": "12.33929","lng": "105.32844"}
,{"code": "VL302050600","name": "Spueu Lech","lat": "12.334432","lng": "105.32287"}
,{"code": "VL302050700","name": "Spueu Kaeut","lat": "12.333239","lng": "105.329463"}
,{"code": "VL302050800","name": "Veal","lat": "12.343152","lng": "105.327921"}

								]
							}
							,{
								"code": "30206"
								,"name": "Svay Teab"
								,"villages": [
									{"code": "VL302060100","name": "Trapeang Beng","lat": "12.281338","lng": "105.256614"}
,{"code": "VL302060200","name": "Pramat Dei","lat": "12.306756","lng": "105.286555"}
,{"code": "VL302060300","name": "Veal Ri Lech","lat": "12.289861","lng": "105.279612"}
,{"code": "VL302060400","name": "Svay Teab","lat": "12.291596","lng": "105.28127"}
,{"code": "VL302060500","name": "Proeks","lat": "12.305068","lng": "105.255828"}
,{"code": "VL302060600","name": "Thnal Baek Lech","lat": "12.311467","lng": "105.277529"}
,{"code": "VL302060700","name": "Tang Krang","lat": "12.274413","lng": "105.282015"}
,{"code": "VL302060800","name": "Maha","lat": "12.289987","lng": "105.243233"}
,{"code": "VL302060900","name": "Bos Thlan","lat": "12.268573","lng": "105.220997"}
,{"code": "VL302061000","name": "Srae Preal","lat": "12.307094","lng": "105.265229"}
,{"code": "VL302061100","name": "Ou Dar","lat": "12.289244","lng": "105.290739"}
,{"code": "VL302061200","name": "Thnal Baek Kaeut","lat": "12.316383","lng": "105.28091"}
,{"code": "VL302061300","name": "Veal Ri Kaeut","lat": "12.28767","lng": "105.282222"}
,{"code": "VL302061400","name": "Chetseb Prampir","lat": "12.304224","lng": "105.249665"}

								]
							}
							,{
								"code": "30207"
								,"name": "Ta Ong"
								,"villages": [
									{"code": "VL302070100","name": "Ta Ong","lat": "12.237508","lng": "105.299518"}
,{"code": "VL302070200","name": "Sampoar","lat": "12.238894","lng": "105.232236"}
,{"code": "VL302070300","name": "Tuol Prak","lat": "12.263371","lng": "105.346194"}
,{"code": "VL302070400","name": "Tuol Meas","lat": "12.258369","lng": "105.340164"}
,{"code": "VL302070500","name": "Tuol Paen","lat": "12.279274","lng": "105.355622"}
,{"code": "VL302070600","name": "Chamraeun Phal","lat": "12.273526","lng": "105.331393"}
,{"code": "VL302070700","name": "Trapeang Chhuk","lat": "12.24151","lng": "105.228183"}
,{"code": "VL302070800","name": "Tuol Srov","lat": "12.279743","lng": "105.342408"}
,{"code": "VL302070900","name": "Phum Samseb","lat": "12.237863","lng": "105.336782"}
,{"code": "VL302071000","name": "Phum Sammuoy","lat": "12.22192","lng": "105.322062"}
,{"code": "VL302071100","name": "Phum Sampir","lat": "12.221695","lng": "105.30497"}
,{"code": "VL302071200","name": "Phum Sambei","lat": "12.221143","lng": "105.279935"}
,{"code": "VL302071300","name": "Phum Sambuon","lat": "12.216748","lng": "105.28017"}
,{"code": "VL302071400","name": "Cham Cha","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "30208"
								,"name": "Ta Prok"
								,"villages": [
									{"code": "VL302080100","name": "Srae Prang","lat": "12.389027","lng": "105.209387"}
,{"code": "VL302080200","name": "Rumchek","lat": "12.383359","lng": "105.249363"}
,{"code": "VL302080300","name": "Neang Laeung","lat": "12.396807","lng": "105.248953"}
,{"code": "VL302080400","name": "Svay Teab","lat": "12.362234","lng": "105.229364"}
,{"code": "VL302080500","name": "Ou Ta Saeng","lat": "12.392709","lng": "105.229768"}
,{"code": "VL302080600","name": "Chhuk","lat": "12.384442","lng": "105.242492"}
,{"code": "VL302080700","name": "Phlak","lat": "12.397213","lng": "105.259165"}

								]
							}
						]
					}
					,{
						"code":  "303"
						,"name":  "Cheung Prey"
						,"communes": [		
							{
								"code": "30301"
								,"name": "Khnor Dambang"
								,"villages": [
									{"code": "VL303010100","name": "Rovieng","lat": "12.038331","lng": "105.019106"}
,{"code": "VL303010200","name": "Knaor Dambang","lat": "12.018689","lng": "105.013923"}
,{"code": "VL303010300","name": "Veal","lat": "12.001742","lng": "105.01507"}

								]
							}
							,{
								"code": "30302"
								,"name": "Kouk Rovieng"
								,"villages": [
									{"code": "VL303020100","name": "Kouk Rovieng","lat": "12.042301","lng": "104.986968"}
,{"code": "VL303020200","name": "Totoul","lat": "12.009248","lng": "104.988347"}
,{"code": "VL303020300","name": "Ba Krong","lat": "12.003839","lng": "104.98086"}
,{"code": "VL303020400","name": "Chhuk","lat": "12.045421","lng": "104.998562"}

								]
							}
							,{
								"code": "30303"
								,"name": "Pdau Chum"
								,"villages": [
									{"code": "VL303030100","name": "Phdau Chum Lech","lat": "12.012086","lng": "105.030752"}
,{"code": "VL303030200","name": "Phdau Chum Kaeut","lat": "12.011669","lng": "105.037449"}
,{"code": "VL303030300","name": "Chheu Teal","lat": "12.043138","lng": "105.04847"}
,{"code": "VL303030400","name": "Cham Neang","lat": "12.01258","lng": "105.052727"}

								]
							}
							,{
								"code": "30304"
								,"name": "Prey Char"
								,"villages": [
									{"code": "VL303040100","name": "Pnov Lech","lat": "12.039702","lng": "105.085513"}
,{"code": "VL303040200","name": "Pnov Kaeut","lat": "12.048959","lng": "105.095035"}
,{"code": "VL303040300","name": "Prey Char Krau","lat": "12.011359","lng": "105.089418"}
,{"code": "VL303040400","name": "Siem Baoy","lat": "12.008328","lng": "105.092889"}
,{"code": "VL303040500","name": "Bati","lat": "12.027463","lng": "105.094292"}
,{"code": "VL303040600","name": "Prey Char Knong","lat": "12.01552","lng": "105.085992"}

								]
							}
							,{
								"code": "30305"
								,"name": "Pring Chrum"
								,"villages": [
									{"code": "VL303050100","name": "Pring Chum","lat": "12.174718","lng": "105.044945"}
,{"code": "VL303050200","name": "Trapeang Tuem","lat": "12.178577","lng": "105.056299"}
,{"code": "VL303050300","name": "Trapeang Ph'av","lat": "12.184681","lng": "105.05641"}
,{"code": "VL303050400","name": "Ta Ni","lat": "12.168873","lng": "105.062069"}
,{"code": "VL303050500","name": "Kaoh Champa","lat": "12.201944","lng": "105.060404"}

								]
							}
							,{
								"code": "30306"
								,"name": "Sampong Chey"
								,"villages": [
									{"code": "VL303060100","name": "Chambak","lat": "12.145364","lng": "105.108874"}
,{"code": "VL303060200","name": "Trapeang Sla","lat": "12.159728","lng": "105.121555"}
,{"code": "VL303060300","name": "Trapeang Trom","lat": "12.14358","lng": "105.13595"}
,{"code": "VL303060400","name": "Ampil Tvear","lat": "12.154978","lng": "105.14637"}
,{"code": "VL303060500","name": "Kakaoh","lat": "12.149008","lng": "105.148499"}
,{"code": "VL303060600","name": "Bos Ta Mom","lat": "12.159992","lng": "105.139074"}
,{"code": "VL303060700","name": "Trapeang Chhuk","lat": "12.165504","lng": "105.127431"}
,{"code": "VL303060800","name": "Pou","lat": "12.17077","lng": "105.122599"}
,{"code": "VL303060900","name": "Bakham","lat": "12.181818","lng": "105.128717"}
,{"code": "VL303061000","name": "Sampong Chey","lat": "12.18852","lng": "105.12599"}
,{"code": "VL303061100","name": "Svay Meas","lat": "12.199842","lng": "105.125572"}
,{"code": "VL303061200","name": "Komar","lat": "12.190625","lng": "105.109683"}
,{"code": "VL303061300","name": "Doun Tao","lat": "12.197971","lng": "105.103086"}
,{"code": "VL303061400","name": "Sandaek","lat": "12.199314","lng": "105.088221"}

								]
							}
							,{
								"code": "30307"
								,"name": "Sdaeung Chey"
								,"villages": [
									{"code": "VL303070100","name": "Pongro","lat": "12.098532","lng": "105.072832"}
,{"code": "VL303070200","name": "Sdaeung Chey","lat": "12.099792","lng": "105.061318"}
,{"code": "VL303070300","name": "Pra Boeng","lat": "12.094486","lng": "105.047303"}
,{"code": "VL303070400","name": "Khnar","lat": "12.095112","lng": "105.02886"}
,{"code": "VL303070500","name": "Sangkae","lat": "12.129463","lng": "105.090891"}
,{"code": "VL303070600","name": "Kdoy","lat": "12.121333","lng": "105.059779"}
,{"code": "VL303070700","name": "Damnak Ampil","lat": "12.139405","lng": "105.04107"}

								]
							}
							,{
								"code": "30308"
								,"name": "Soutip"
								,"villages": [
									{"code": "VL303080100","name": "Pana","lat": "12.063128","lng": "105.068899"}
,{"code": "VL303080200","name": "Skon","lat": "12.05686","lng": "105.074778"}
,{"code": "VL303080300","name": "Thmei","lat": "12.052393","lng": "105.074685"}
,{"code": "VL303080400","name": "Ta Saen","lat": "12.043714","lng": "105.062362"}
,{"code": "VL303080500","name": "Ngoung","lat": "12.03465","lng": "105.074395"}
,{"code": "VL303080600","name": "Doun Dom","lat": "12.017161","lng": "105.069135"}
,{"code": "VL303080700","name": "Boeng Chrouy","lat": "12.003551","lng": "105.070234"}
,{"code": "VL303080800","name": "Sou Tip","lat": "12.016608","lng": "105.076172"}

								]
							}
							,{
								"code": "30309"
								,"name": "Srama"
								,"villages": [
									{"code": "VL303090100","name": "Sram Lech","lat": "12.076108","lng": "105.092986"}
,{"code": "VL303090200","name": "Sram Kaeut","lat": "12.080283","lng": "105.100982"}
,{"code": "VL303090300","name": "Sram Cheung","lat": "12.085793","lng": "105.093293"}
,{"code": "VL303090400","name": "PhumThmei","lat": "12.09265","lng": "105.11126"}
,{"code": "VL303090500","name": "Srama","lat": "12.082516","lng": "105.075355"}
,{"code": "VL303090600","name": "Sangkae Pong","lat": "12.070081","lng": "105.074616"}
,{"code": "VL303090700","name": "Pra Khnaor","lat": "12.081526","lng": "105.113057"}
,{"code": "VL303090800","name": "Kralanh","lat": "12.069652","lng": "105.112932"}
,{"code": "VL303090900","name": "Pra Theat","lat": "12.089253","lng": "105.074695"}
,{"code": "VL303091000","name": "Trapeang Tmat","lat": "12.057925","lng": "105.108453"}
,{"code": "VL303091100","name": "Sram Angkam","lat": "12.081785","lng": "105.121731"}
,{"code": "VL303091200","name": "Andoung Treang","lat": "12.071774","lng": "105.099012"}
,{"code": "VL303091300","name": "Trapeang Snao","lat": "12.0903","lng": "105.108796"}

								]
							}
							,{
								"code": "30310"
								,"name": "Trapeang Kor"
								,"villages": [
									{"code": "VL303100100","name": "Trapeang Thma","lat": "12.12814","lng": "105.123204"}
,{"code": "VL303100200","name": "S'ang","lat": "12.121873","lng": "105.121924"}
,{"code": "VL303100300","name": "Angk","lat": "12.110568","lng": "105.125549"}
,{"code": "VL303100400","name": "Praten","lat": "12.105378","lng": "105.123038"}
,{"code": "VL303100500","name": "Tumpoar","lat": "12.089841","lng": "105.125603"}
,{"code": "VL303100600","name": "Tnaot Bak","lat": "12.099616","lng": "105.103461"}
,{"code": "VL303100700","name": "Kandal","lat": "12.112219","lng": "105.087246"}
,{"code": "VL303100800","name": "Areaks","lat": "12.104729","lng": "105.094255"}
,{"code": "VL303100900","name": "Trapeang Kor","lat": "12.133358","lng": "105.099908"}
,{"code": "VL303101000","name": "Kngaok","lat": "12.116514","lng": "105.115157"}

								]
							}
						]
					}
					,{
						"code":  "305"
						,"name":  "Kampong Cham"
						,"communes": [		
							{
								"code": "30501"
								,"name": "Boeng Kok"
								,"villages": [
									{"code": "VL305010100","name": "Boeng Kok Ti Muoy","lat": "11.999183","lng": "105.461201"}
,{"code": "VL305010200","name": "Boeng Kok Ti Pir","lat": "12.00272","lng": "105.460683"}
,{"code": "VL305010300","name": "Chong Thnal Ti Muoy","lat": "12.008208","lng": "105.467013"}
,{"code": "VL305010400","name": "Chong Thnal Ti Pir","lat": "12.013729","lng": "105.469089"}
,{"code": "VL305010500","name": "La Edth","lat": "12.015237","lng": "105.46493"}
,{"code": "VL305010600","name": "Chrouy Thma","lat": "11.997754","lng": "105.467077"}
,{"code": "VL305010700","name": "Memay","lat": "11.998346","lng": "105.464194"}

								]
							}
							,{
								"code": "30502"
								,"name": "Kampong Cham"
								,"villages": [
									{"code": "VL305020100","name": "Phum Ti Prampir","lat": "11.992684","lng": "105.459812"}
,{"code": "VL305020200","name": "Phum Ti Prambei","lat": "11.989611","lng": "105.463775"}
,{"code": "VL305020300","name": "Phum Ti Prambuon","lat": "11.988644","lng": "105.463461"}
,{"code": "VL305020400","name": "Phum Ti Dab","lat": "11.988441","lng": "105.466133"}
,{"code": "VL305020500","name": "Phum Ti Dabmuoy","lat": "11.989698","lng": "105.466227"}
,{"code": "VL305020600","name": "Phum Ti Dabpir","lat": "11.991599","lng": "105.465128"}
,{"code": "VL305020700","name": "Phum Ti Dabbei","lat": "11.99007","lng": "105.465594"}
,{"code": "VL305020800","name": "Phum Ti Dabbuon","lat": "11.99953","lng": "105.459024"}
,{"code": "VL305020900","name": "Phum Ti Dabpram","lat": "11.994951","lng": "105.466732"}

								]
							}
							,{
								"code": "30503"
								,"name": "Sambuor Meas"
								,"villages": [
									{"code": "VL305030100","name": "Roka Leu","lat": "11.976843","lng": "105.458031"}
,{"code": "VL305030200","name": "Roka Kraom","lat": "11.975089","lng": "105.452241"}
,{"code": "VL305030300","name": "Neang Konghing","lat": "11.978695","lng": "105.453515"}
,{"code": "VL305030400","name": "Boeng Basak","lat": "11.986574","lng": "105.440365"}
,{"code": "VL305030500","name": "Chamkar Khpob","lat": "11.989226","lng": "105.433278"}
,{"code": "VL305030600","name": "Boeng Snay","lat": "11.991931","lng": "105.449578"}
,{"code": "VL305030700","name": "Preaek Daeum Chan","lat": "11.975532","lng": "105.446455"}
,{"code": "VL305030800","name": "Preaek Chik","lat": "11.966804","lng": "105.43631"}
,{"code": "VL305030900","name": "Kampong Roling","lat": "11.972996","lng": "105.42009"}

								]
							}
							,{
								"code": "30504"
								,"name": "Veal Vong"
								,"villages": [
									{"code": "VL305040100","name": "Phum Ti Muoy","lat": "11.986256","lng": "105.45823"}
,{"code": "VL305040200","name": "Phum Ti Pir","lat": "11.979306","lng": "105.46125"}
,{"code": "VL305040300","name": "Phum Ti Bei","lat": "11.987205","lng": "105.464074"}
,{"code": "VL305040400","name": "Phum Ti Buon","lat": "11.990584","lng": "105.460653"}
,{"code": "VL305040500","name": "Phum Ti Pram","lat": "11.989031","lng": "105.459227"}
,{"code": "VL305040600","name": "Phum Ti Prammuoy","lat": "11.993885","lng": "105.455037"}

								]
							}
						]
					}
					,{
						"code":  "306"
						,"name":  "Kampong Siem"
						,"communes": [		
							{
								"code": "30601"
								,"name": "Ampil"
								,"villages": [
									{"code": "VL306010100","name": "Andoung Chraoh","lat": "12.019259","lng": "105.420998"}
,{"code": "VL306010200","name": "Ampil Leu","lat": "12.007118","lng": "105.436384"}
,{"code": "VL306010300","name": "Ampil Kraom","lat": "12.006736","lng": "105.425571"}
,{"code": "VL306010400","name": "Cheung Kouk","lat": "12.016847","lng": "105.406791"}
,{"code": "VL306010500","name": "Roliek","lat": "12.000931","lng": "105.394624"}
,{"code": "VL306010600","name": "Romeas","lat": "11.992371","lng": "105.417052"}
,{"code": "VL306010700","name": "Banteay Thma","lat": "11.991071","lng": "105.402785"}
,{"code": "VL306010800","name": "Sralau","lat": "12.022356","lng": "105.429739"}
,{"code": "VL306010900","name": "Krala","lat": "12.018019","lng": "105.396642"}
,{"code": "VL306011000","name": "Chonghuk","lat": "11.998298","lng": "105.443452"}
,{"code": "VL306011100","name": "Veal Sbov","lat": "11.995983","lng": "105.432113"}
,{"code": "VL306011200","name": "Sya","lat": "11.998822","lng": "105.426836"}

								]
							}
							,{
								"code": "30602"
								,"name": "Hanchey"
								,"villages": [
									{"code": "VL306020100","name": "Hanchey","lat": "12.151437","lng": "105.528666"}
,{"code": "VL306020200","name": "Krouch Saeuch","lat": "12.148904","lng": "105.529286"}
,{"code": "VL306020300","name": "Lvea Ter","lat": "12.137621","lng": "105.528032"}
,{"code": "VL306020400","name": "Moan Haeur","lat": "12.135632","lng": "105.527514"}

								]
							}
							,{
								"code": "30603"
								,"name": "Kien Chrey"
								,"villages": [
									{"code": "VL306030100","name": "Preaek Yuon","lat": "12.073448","lng": "105.485713"}
,{"code": "VL306030200","name": "Enteak Nel","lat": "12.090357","lng": "105.486782"}
,{"code": "VL306030300","name": "Spean Thmei","lat": "12.074863","lng": "105.498892"}
,{"code": "VL306030400","name": "Boeng Babos","lat": "12.072051","lng": "105.488238"}
,{"code": "VL306030500","name": "Kien Chrey Krau","lat": "12.065667","lng": "105.498554"}
,{"code": "VL306030600","name": "Kien Chrey Knong","lat": "12.070692","lng": "105.484376"}

								]
							}
							,{
								"code": "30604"
								,"name": "Kokor"
								,"villages": [
									{"code": "VL306040100","name": "Kokor Muoy","lat": "11.944181","lng": "105.384338"}
,{"code": "VL306040200","name": "Kokor Pir","lat": "11.940327","lng": "105.372329"}
,{"code": "VL306040300","name": "Chamkar Samseb","lat": "11.939409","lng": "105.368516"}
,{"code": "VL306040400","name": "Kampong Krabei","lat": "11.938063","lng": "105.36068"}

								]
							}
							,{
								"code": "30605"
								,"name": "Kaoh Mitt"
								,"villages": [
									{"code": "VL306040100","name": "Kokor Muoy","lat": "11.944181","lng": "105.384338"}
,{"code": "VL306040200","name": "Kokor Pir","lat": "11.940327","lng": "105.372329"}
,{"code": "VL306040300","name": "Chamkar Samseb","lat": "11.939409","lng": "105.368516"}
,{"code": "VL306040400","name": "Kampong Krabei","lat": "11.938063","lng": "105.36068"}

								]
							}
							,{
								"code": "30606"
								,"name": "Kaoh Roka"
								,"villages": [
									{"code": "VL306060100","name": "Kaoh Roka Krau","lat": "11.94423","lng": "105.401227"}
,{"code": "VL306060200","name": "Kaoh Roka Knong","lat": "11.945397","lng": "105.387986"}
,{"code": "VL306060300","name": "Dambang Daek","lat": "11.952573","lng": "105.410222"}
,{"code": "VL306060400","name": "Ou Chhleung","lat": "11.956467","lng": "105.418668"}
,{"code": "VL306060500","name": "Ta Meang","lat": "11.959288","lng": "105.425074"}
,{"code": "VL306060600","name": "Thmei","lat": "11.944774","lng": "105.412864"}

								]
							}
							,{
								"code": "30607"
								,"name": "Kaoh Samraong"
								,"villages": [
									
								]
							}
							,{
								"code": "30608"
								,"name": "Kaoh Tontuem"
								,"villages": [
									{"code": "VL306080100","name": "Kaoh Kok Ka","lat": "11.927972","lng": "105.387336"}
,{"code": "VL306080200","name": "Kaoh Kok Kha","lat": "11.932963","lng": "105.374256"}
,{"code": "VL306080300","name": "Kaoh Prak Kraom","lat": "11.937539","lng": "105.387322"}
,{"code": "VL306080400","name": "Kaoh Prak Knong","lat": "11.933529","lng": "105.40326"}
,{"code": "VL306080500","name": "Kaoh Prak Leu","lat": "11.939613","lng": "105.3983"}

								]
							}
							,{
								"code": "30609"
								,"name": "Krala"
								,"villages": [
									{"code": "VL306090100","name": "Sdach Non","lat": "12.054692","lng": "105.36848"}
,{"code": "VL306090200","name": "Tuol Beng","lat": "12.049332","lng": "105.373076"}
,{"code": "VL306090300","name": "Andoung Pou","lat": "12.055186","lng": "105.403128"}
,{"code": "VL306090400","name": "Tuol Popel","lat": "12.039457","lng": "105.411401"}
,{"code": "VL306090500","name": "Trapeang Chrey","lat": "12.044239","lng": "105.39409"}
,{"code": "VL306090600","name": "Trapeang Tras","lat": "12.036069","lng": "105.390688"}
,{"code": "VL306090700","name": "Trapeang Ruessei","lat": "12.056212","lng": "105.393933"}
,{"code": "VL306090800","name": "Angkuonh Dei","lat": "12.044231","lng": "105.387043"}
,{"code": "VL306090900","name": "Ampil Chrum","lat": "12.066183","lng": "105.396327"}
,{"code": "VL306091000","name": "Thmei","lat": "12.047924","lng": "105.377879"}
,{"code": "VL306091100","name": "Trapeang Thma","lat": "12.036255","lng": "105.399875"}
,{"code": "VL306091200","name": "Trapeang Char","lat": "12.027793","lng": "105.410859"}
,{"code": "VL306091300","name": "Trakuon","lat": "12.027597","lng": "105.402021"}

								]
							}
							,{
								"code": "30610"
								,"name": "Ou Svay"
								,"villages": [
									{"code": "VL306100100","name": "Prey Chakkrei","lat": "12.07944","lng": "105.363157"}
,{"code": "VL306100200","name": "Anlong Snouk","lat": "12.100714","lng": "105.345376"}
,{"code": "VL306100300","name": "Ampil Kranhanh","lat": "12.097556","lng": "105.36172"}
,{"code": "VL306100400","name": "Ou Svay","lat": "12.103845","lng": "105.379179"}
,{"code": "VL306100500","name": "Trapeang Kak","lat": "12.094013","lng": "105.387068"}
,{"code": "VL306100600","name": "Ou Thnong","lat": "12.075374","lng": "105.353751"}
,{"code": "VL306100700","name": "Khael Chey","lat": "12.054565","lng": "105.354303"}

								]
							}
							,{
								"code": "30611"
								,"name": "Ro'ang"
								,"villages": [
									{"code": "VL306110100","name": "Thma Koul","lat": "12.018944","lng": "105.465892"}
,{"code": "VL306110200","name": "Veal Khsach","lat": "12.026827","lng": "105.450867"}
,{"code": "VL306110300","name": "Prasam","lat": "12.013338","lng": "105.453922"}
,{"code": "VL306110400","name": "Pongro","lat": "12.066685","lng": "105.458587"}
,{"code": "VL306110500","name": "Romul","lat": "12.049009","lng": "105.445382"}
,{"code": "VL306110600","name": "Tuol Roka","lat": "12.054743","lng": "105.482942"}
,{"code": "VL306110700","name": "Ro'ang Leu","lat": "12.042359","lng": "105.479915"}
,{"code": "VL306110800","name": "Ro'ang Kraom","lat": "12.054889","lng": "105.487279"}

								]
							}
							,{
								"code": "30612"
								,"name": "Rumchek"
								,"villages": [
									{"code": "VL306120100","name": "Chheu Teal Srot Leu","lat": "12.115581","lng": "105.524662"}
,{"code": "VL306120200","name": "Chheu Teal Srot Kraom","lat": "12.102496","lng": "105.519491"}
,{"code": "VL306120300","name": "Rumlech","lat": "12.094919","lng": "105.514523"}
,{"code": "VL306120400","name": "Thmei","lat": "12.086872","lng": "105.508572"}

								]
							}
							,{
								"code": "30613"
								,"name": "Srak"
								,"villages": [
									{"code": "VL306130100","name": "Lpeak","lat": "12.132596","lng": "105.43236"}
,{"code": "VL306130200","name": "Prey Kuy","lat": "12.114745","lng": "105.42032"}
,{"code": "VL306130300","name": "Srak","lat": "12.16615","lng": "105.46838"}

								]
							}
							,{
								"code": "30614"
								,"name": "Trean"
								,"villages": [
									{"code": "VL306140100","name": "Chrak Sdau","lat": "12.063058","lng": "105.442015"}
,{"code": "VL306140200","name": "Veal Kriel","lat": "12.097721","lng": "105.435961"}
,{"code": "VL306140300","name": "Trean","lat": "12.08558","lng": "105.438725"}
,{"code": "VL306140400","name": "Trapeang Ta Sokh","lat": "12.07339","lng": "105.42133"}
,{"code": "VL306140500","name": "Prathang","lat": "12.090606","lng": "105.434378"}
,{"code": "VL306140600","name": "Paen","lat": "12.083918","lng": "105.443225"}
,{"code": "VL306140700","name": "Tuol Chambak","lat": "12.078404","lng": "105.430297"}
,{"code": "VL306140800","name": "Chranieng","lat": "12.069681","lng": "105.445453"}
,{"code": "VL306140900","name": "Trapeang Ampil","lat": "12.054759","lng": "105.422992"}
,{"code": "VL306141000","name": "Ta Khong","lat": "12.068739","lng": "105.423592"}
,{"code": "VL306141100","name": "Tuol Trach","lat": "12.059358","lng": "105.43113"}
,{"code": "VL306141200","name": "Poun","lat": "12.078893","lng": "105.435912"}

								]
							}
							,{
								"code": "30615"
								,"name": "Vihear Thum"
								,"villages": [
									{"code": "VL306150100","name": "Prey Phdau","lat": "12.014637","lng": "105.384153"}
,{"code": "VL306150200","name": "Andoung Svay","lat": "12.013804","lng": "105.377905"}
,{"code": "VL306150300","name": "Kouk Kream","lat": "12.012918","lng": "105.371381"}
,{"code": "VL306150400","name": "Kdei Boeng","lat": "12.011977","lng": "105.357453"}
,{"code": "VL306150500","name": "Pongro","lat": "12.005123","lng": "105.370608"}
,{"code": "VL306150600","name": "Prasat","lat": "11.995723","lng": "105.367426"}
,{"code": "VL306150700","name": "Kouk Totea","lat": "12.004216","lng": "105.35161"}
,{"code": "VL306150800","name": "Vihear","lat": "12.003694","lng": "105.37078"}
,{"code": "VL306150900","name": "Kong Moha","lat": "12.03156","lng": "105.368072"}

								]
							}

						]
					}
					,{
						"code":  "307"
						,"name":  "Kang Meas"
						,"communes": [		
							{
								"code": "30701"
								,"name": "Angkor Ban"
								,"villages": [
									{"code": "VL307010100","name": "Angkor Ban Ti Muoy","lat": "11.947919","lng": "105.233711"}
,{"code": "VL307010200","name": "Angkor Ban Ti Pir","lat": "11.95223","lng": "105.225853"}
,{"code": "VL307010300","name": "Angkor Ban Ti Bei","lat": "11.949699","lng": "105.223435"}
,{"code": "VL307010400","name": "Angkor Ban Ti Buon","lat": "11.953132","lng": "105.217294"}
,{"code": "VL307010500","name": "Angkor Ban Ti Pram","lat": "11.953938","lng": "105.215154"}
,{"code": "VL307010600","name": "Angkor Ban Ti Prammuoy","lat": "11.955009","lng": "105.210774"}
,{"code": "VL307010700","name": "Angkor Ban Ti Prampir","lat": "11.958131","lng": "105.207507"}
,{"code": "VL307010800","name": "Angkor Ban Ti Prambei","lat": "11.956017","lng": "105.204878"}
,{"code": "VL307010900","name": "Angkor Ban Ti Prambuon","lat": "11.956778","lng": "105.202004"}

								]
							}
							,{
								"code": "30702"
								,"name": "Kang Ta Noeng"
								,"villages": [
									{"code": "VL307020100","name": "Kang Ta Noeng Ti Muoy","lat": "11.854197","lng": "105.080047"}
,{"code": "VL307020200","name": "Kang Ta Noeng Ti Pir","lat": "11.85371","lng": "105.074345"}
,{"code": "VL307020300","name": "Kang Ta Noeng Ti Bei","lat": "11.852897","lng": "105.071343"}
,{"code": "VL307020400","name": "Kang Ta Noeng Ti Buon","lat": "11.85298","lng": "105.06453"}
,{"code": "VL307020500","name": "Kang Ta Noeng Ti Pram","lat": "11.854283","lng": "105.061942"}
,{"code": "VL307020600","name": "Kang Ta Noeng Ti Prammuoy","lat": "11.855649","lng": "105.058774"}
,{"code": "VL307020700","name": "Kang Ta Noeng Ti Prampir","lat": "11.855903","lng": "105.05445"}
,{"code": "VL307020800","name": "Kang Ta Noeng Ti Prambei","lat": "11.859224","lng": "105.047491"}
,{"code": "VL307020900","name": "Kang Ta Noeng Ti Prambuon","lat": "11.85879","lng": "105.044314"}

								]
							}
							,{
								"code": "30703"
								,"name": "Khchau"
								,"villages": [
									{"code": "VL307030100","name": "Thlok Chrov","lat": "11.935225","lng": "105.16449"}
,{"code": "VL307030200","name": "Svay Poan Ti Muoy","lat": "11.932442","lng": "105.162018"}
,{"code": "VL307030300","name": "Svay Poan Ti Pir","lat": "11.928963","lng": "105.156037"}
,{"code": "VL307030400","name": "Ou Popel","lat": "11.926695","lng": "105.153281"}
,{"code": "VL307030500","name": "Khchau Ti Muoy","lat": "11.919926","lng": "105.143937"}
,{"code": "VL307030600","name": "Khchau Ti Pir","lat": "11.918599","lng": "105.140355"}
,{"code": "VL307030700","name": "Khchau Ti Bei","lat": "11.912642","lng": "105.135384"}
,{"code": "VL307030800","name": "Varint Ti Muoy","lat": "11.90653","lng": "105.131249"}
,{"code": "VL307030900","name": "Varint Ti Pir","lat": "11.901186","lng": "105.130199"}
,{"code": "VL307031000","name": "Varint Ti Bei","lat": "11.897587","lng": "105.129656"}
,{"code": "VL1307030100","name": "Bak Kam","lat": "13.78045","lng": "104.897336"}
,{"code": "VL1307030200","name": "Sedthakkech","lat": "13.780942","lng": "104.905634"}
,{"code": "VL1307030300","name": "Moha Phal","lat": "13.780447","lng": "104.914469"}

								]
							}
							,{
								"code": "30704"
								,"name": "Peam Chi Kang"
								,"villages": [
									{"code": "VL307040100","name": "Damnak Chrey","lat": "11.964818","lng": "105.267407"}
,{"code": "VL307040200","name": "Damnak Snay","lat": "11.95201","lng": "105.270003"}
,{"code": "VL307040300","name": "Peam Chi Kang","lat": "11.948549","lng": "105.267593"}
,{"code": "VL307040400","name": "Sach Sour","lat": "11.94481","lng": "105.261821"}
,{"code": "VL307040500","name": "Sambuor Meas Ka","lat": "11.946446","lng": "105.252969"}
,{"code": "VL307040600","name": "Sambuor Meas Kha","lat": "11.948392","lng": "105.240912"}
,{"code": "VL307040700","name": "Kaoh Touch","lat": "11.933069","lng": "105.223394"}

								]
							}
							,{
								"code": "30705"
								,"name": "Preaek Koy"
								,"villages": [
									{"code": "VL307050100","name": "Preaek Koy","lat": "11.868533","lng": "105.000298"}
,{"code": "VL307050200","name": "Anlong Kokir","lat": "11.874104","lng": "105.004678"}
,{"code": "VL307050300","name": "Kong Chey","lat": "11.924529","lng": "105.019979"}
,{"code": "VL307050400","name": "Kouhe","lat": "11.931348","lng": "105.012789"}
,{"code": "VL307050500","name": "Me Sar","lat": "11.950944","lng": "105.029037"}
,{"code": "VL307050600","name": "Ou Svay Lech","lat": "11.91572","lng": "105.026278"}
,{"code": "VL307050700","name": "Ou Svay Kaeut","lat": "11.911913","lng": "105.031962"}

								]
							}
							,{
								"code": "30706"
								,"name": "Preaek Krabau"
								,"villages": [
									{"code": "VL307060100","name": "Pou Sala Ti Muoy","lat": "11.982633","lng": "105.266873"}
,{"code": "VL307060200","name": "Pou Sala Ti Pir","lat": "11.991172","lng": "105.26476"}
,{"code": "VL307060300","name": "Peam Knong","lat": "11.993948","lng": "105.265433"}
,{"code": "VL307060400","name": "Preaek Andoung","lat": "11.992569","lng": "105.260352"}
,{"code": "VL307060500","name": "Preaek Krabau","lat": "11.996282","lng": "105.254348"}
,{"code": "VL307060600","name": "Ou Kandaol","lat": "12.005033","lng": "105.267593"}
,{"code": "VL307060700","name": "Andoung Ta Ong","lat": "12.015801","lng": "105.260282"}
,{"code": "VL307060800","name": "Andoung Dai","lat": "12.018324","lng": "105.23978"}
,{"code": "VL307060900","name": "Tuek Chenh","lat": "12.018266","lng": "105.244502"}
,{"code": "VL307061000","name": "Chamkar Ovloek","lat": "11.99713","lng": "105.236068"}

								]
							}
							,{
								"code": "30707"
								,"name": "Reay Pay"
								,"villages": [
									{"code": "VL307070100","name": "Kanlaeng Run","lat": "11.957644","lng": "105.128922"}
,{"code": "VL307070200","name": "Boeng Totea","lat": "11.956426","lng": "105.12308"}
,{"code": "VL307070300","name": "Tuol Vihear","lat": "11.948478","lng": "105.097562"}
,{"code": "VL307070400","name": "Tuol Bei","lat": "11.952848","lng": "105.136745"}
,{"code": "VL307070500","name": "Reay Pay Leu","lat": "11.93941","lng": "105.088632"}
,{"code": "VL307070600","name": "Reay Pay Kraom","lat": "11.941141","lng": "105.077492"}
,{"code": "VL307070700","name": "Preaek Pranak","lat": "11.925136","lng": "105.06992"}
,{"code": "VL307070800","name": "Kok Krabei","lat": "11.917578","lng": "105.060257"}

								]
							}
							,{
								"code": "30708"
								,"name": "Roka Ar"
								,"villages": [
									{"code": "VL307080100","name": "Preaek Liv Ti Muoy","lat": "11.886266","lng": "105.127024"}
,{"code": "VL307080200","name": "Preaek Liv Ti Pir","lat": "11.880731","lng": "105.12715"}
,{"code": "VL307080300","name": "Preaek Liv Ti Bei","lat": "11.877774","lng": "105.128003"}
,{"code": "VL307080400","name": "Preaek Liv Ti Buon","lat": "11.874873","lng": "105.124154"}
,{"code": "VL307080500","name": "Chrouy Krabau Ti Muoy","lat": "11.868443","lng": "105.123756"}
,{"code": "VL307080600","name": "Chrouy Krabau Ti Pir","lat": "11.866292","lng": "105.121276"}
,{"code": "VL307080700","name": "Svay Sranaoh Ti Muoy","lat": "11.858004","lng": "105.109126"}
,{"code": "VL307080800","name": "Svay Sranaoh Ti Pir","lat": "11.85656","lng": "105.10144"}
,{"code": "VL307080900","name": "Roka Ar","lat": "11.855171","lng": "105.090468"}

								]
							}
							,{
								"code": "30709"
								,"name": "Roka Koy"
								,"villages": [
									{"code": "VL307090100","name": "Roka Koy Ka","lat": "11.938286","lng": "105.334304"}
,{"code": "VL307090200","name": "Roka Koy Kha","lat": "11.939021","lng": "105.32412"}
,{"code": "VL307090300","name": "Phum Thmei Ka","lat": "11.940444","lng": "105.313037"}
,{"code": "VL307090400","name": "PhumThmei Kha","lat": "11.940627","lng": "105.302604"}
,{"code": "VL307090500","name": "Pongro","lat": "11.941646","lng": "105.29748"}
,{"code": "VL307090600","name": "Svay Ta Haen","lat": "11.942489","lng": "105.277092"}
,{"code": "VL307090700","name": "Damnak L'et","lat": "11.963131","lng": "105.271814"}

								]
							}
							,{
								"code": "30710"
								,"name": "Sdau"
								,"villages": [
									{"code": "VL307100100","name": "Khpob Leu","lat": "11.861757","lng": "105.039458"}
,{"code": "VL307100200","name": "Khpob Kraom","lat": "11.861767","lng": "105.030662"}
,{"code": "VL307100300","name": "Sdau","lat": "11.862871","lng": "105.023298"}
,{"code": "VL307100400","name": "Lvea Leu","lat": "11.86147","lng": "105.01397"}
,{"code": "VL307100500","name": "Lvea Kraom","lat": "11.863071","lng": "105.01284"}
,{"code": "VL307100600","name": "Anlong Kokir","lat": "11.86242","lng": "105.002502"}

								]
							}
							,{
								"code": "30711"
								,"name": "Sour Kong"
								,"villages": [
									{"code": "VL307110100","name": "Kaoh Ta Ngao Ti Muoy","lat": "11.954561","lng": "105.192331"}
,{"code": "VL307110200","name": "Kaoh Ta Ngao Ti Pir","lat": "11.956732","lng": "105.190836"}
,{"code": "VL307110300","name": "Kaoh Ta Ngao Ti Bei","lat": "11.954508","lng": "105.189622"}
,{"code": "VL307110400","name": "Boeng Sang Kaeut","lat": "11.949682","lng": "105.185843"}
,{"code": "VL307110500","name": "Boeng Sang Lech","lat": "11.947822","lng": "105.180295"}
,{"code": "VL307110600","name": "Kdei","lat": "11.948016","lng": "105.174105"}
,{"code": "VL307110700","name": "Souken","lat": "11.942431","lng": "105.168636"}
,{"code": "VL307110800","name": "Boeng Trav","lat": "11.964873","lng": "105.15908"}
,{"code": "VL307110900","name": "Preaek Kruos","lat": "11.985282","lng": "105.175975"}
,{"code": "VL307111000","name": "Anlong Ak Lech","lat": "11.965323","lng": "105.176917"}
,{"code": "VL307111100","name": "Anlong Ak Kaeut","lat": "11.963263","lng": "105.18836"}

								]
							}
						]
					}
					,{
						"code":  "308"
						,"name":  "Kaoh Soutin"
						,"communes": [		
							{
								"code": "30801"
								,"name": "Kampong Reab"
								,"villages": [
									{"code": "VL308010100","name": "Kaoh Chen Kraom","lat": "11.894179","lng": "105.379722"}
,{"code": "VL308010200","name": "Kaoh Chen Leu","lat": "11.892843","lng": "105.384137"}
,{"code": "VL308010300","name": "Kampong Reab Leu","lat": "11.903688","lng": "105.37609"}
,{"code": "VL308010400","name": "Kampong Reab Kraom","lat": "11.909849","lng": "105.374289"}
,{"code": "VL308010500","name": "Kampong Sdei Leu","lat": "11.918621","lng": "105.360131"}
,{"code": "VL308010600","name": "Kampong Sdei Kraom","lat": "11.920431","lng": "105.351961"}
,{"code": "VL308010700","name": "Kampong Sdei Kandal","lat": "11.919285","lng": "105.356615"}
,{"code": "VL308010800","name": "Kampong Sdei Knong","lat": "11.918807","lng": "105.348983"}

								]
							}
							,{
								"code": "30802"
								,"name": "Kaoh Sotin"
								,"villages": [
									{"code": "VL308020100","name": "Phum Ti Muoy","lat": "11.917672","lng": "105.447811"}
,{"code": "VL308020200","name": "Phum Ti Pir","lat": "11.925743","lng": "105.439458"}
,{"code": "VL308020300","name": "Phum Ti Bei","lat": "11.928006","lng": "105.438259"}
,{"code": "VL308020400","name": "Phum Ti Buon","lat": "11.922337","lng": "105.437552"}
,{"code": "VL308020500","name": "Phum Ti Pram","lat": "11.91676","lng": "105.423566"}
,{"code": "VL308020600","name": "Phum Ti Prammuoy","lat": "11.916101","lng": "105.410792"}
,{"code": "VL308020700","name": "Phum Ti Prampir","lat": "11.900369","lng": "105.414726"}
,{"code": "VL308020800","name": "Phum Ti Prambei","lat": "11.907534","lng": "105.40043"}
,{"code": "VL308020900","name": "Phum Ti Prambuon","lat": "11.918242","lng": "105.393025"}
,{"code": "VL308021000","name": "Phum Ti Dab","lat": "11.928007","lng": "105.425521"}
,{"code": "VL308021100","name": "Phum Ti Dabmuoy","lat": "11.921765","lng": "105.42115"}
,{"code": "VL308021200","name": "Phum Ti Dabpir","lat": "11.923816","lng": "105.397258"}
,{"code": "VL308021300","name": "Phum Ti Dabbei","lat": "11.917313","lng": "105.40408"}
,{"code": "VL308021400","name": "Phum T Dabbuon","lat": "11.905808","lng": "105.430326"}

								]
							}
							,{
								"code": "30803"
								,"name": "Lve"
								,"villages": [
									{"code": "VL308030100","name": "Damnak Svay","lat": "11.856475","lng": "105.419654"}
,{"code": "VL308030200","name": "Roka Kaong","lat": "11.846943","lng": "105.42019"}
,{"code": "VL308030300","name": "Preaek Kol","lat": "11.850454","lng": "105.412603"}
,{"code": "VL308030400","name": "Bat Srei Totueng","lat": "11.839397","lng": "105.391223"}
,{"code": "VL308030500","name": "Ambaeng Ches","lat": "11.844579","lng": "105.384868"}
,{"code": "VL308030600","name": "Lve Leu","lat": "11.845341","lng": "105.382721"}
,{"code": "VL308030700","name": "Lve Kraom","lat": "11.84601","lng": "105.376222"}
,{"code": "VL308030800","name": "Tumpung","lat": "11.847252","lng": "105.400149"}
,{"code": "VL308030900","name": "Preaek Ta Kae","lat": "11.846836","lng": "105.37401"}
,{"code": "VL308031000","name": "Preaek Changkran","lat": "11.851577","lng": "105.372098"}

								]
							}
							,{
								"code": "30804"
								,"name": "Moha Leaph"
								,"villages": [
									{"code": "VL308040100","name": "Chong Preaek","lat": "11.86506","lng": "105.423982"}
,{"code": "VL308040200","name": "Moha Leaph Cheung","lat": "11.867849","lng": "105.421416"}
,{"code": "VL308040300","name": "Moha Leaph Tboung","lat": "11.863527","lng": "105.420959"}
,{"code": "VL308040400","name": "Roka Kaong Tboung","lat": "11.852013","lng": "105.422346"}
,{"code": "VL308040500","name": "Roka Kaong Cheung","lat": "11.854446","lng": "105.422276"}
,{"code": "VL308040600","name": "Damnak Pring Kaeut","lat": "11.849535","lng": "105.422599"}
,{"code": "VL308040700","name": "Damnak Pring Lech","lat": "11.843006","lng": "105.416512"}
,{"code": "VL308040800","name": "Roat Muni","lat": "11.839171","lng": "105.410428"}
,{"code": "VL308040900","name": "Chrouy Saset","lat": "11.846644","lng": "105.408447"}
,{"code": "VL308041000","name": "Preaek","lat": "11.841756","lng": "105.405337"}

								]
							}
							,{
								"code": "30805"
								,"name": "Moha Khnhoung"
								,"villages": [
									{"code": "VL308050100","name": "Khpob","lat": "11.924683","lng": "105.343324"}
,{"code": "VL308050200","name": "Mohasiek Leu","lat": "11.926882","lng": "105.334144"}
,{"code": "VL308050300","name": "Mohasiek Kraom","lat": "11.927327","lng": "105.325401"}
,{"code": "VL308050400","name": "Kampong Chamlang","lat": "11.92659","lng": "105.321387"}
,{"code": "VL308050500","name": "Khnhoung Leu","lat": "11.926532","lng": "105.316244"}
,{"code": "VL308050600","name": "Kandal Khnhoung","lat": "11.925074","lng": "105.310117"}
,{"code": "VL308050700","name": "Chong Khnhoung","lat": "11.924338","lng": "105.305194"}
,{"code": "VL308050800","name": "Angkor Chey Leu","lat": "11.922618","lng": "105.298084"}
,{"code": "VL308050900","name": "Angkor Chey Kraom","lat": "11.924594","lng": "105.293641"}

								]
							}
							,{
								"code": "30806"
								,"name": "Peam Prathnuoh"
								,"villages": [
									{"code": "VL308060100","name": "Phsar Thmei","lat": "11.885264","lng": "105.428659"}
,{"code": "VL308060200","name": "Peam","lat": "11.906151","lng": "105.459197"}
,{"code": "VL308060300","name": "Thmei","lat": "11.900185","lng": "105.451979"}
,{"code": "VL308060400","name": "Krapeu Korm","lat": "11.894766","lng": "105.453476"}
,{"code": "VL308060500","name": "Pak Nam","lat": "11.885018","lng": "105.424105"}
,{"code": "VL308060600","name": "Chi Haer","lat": "11.891946","lng": "105.423776"}
,{"code": "VL308060700","name": "Samraong","lat": "11.879962","lng": "105.41868"}
,{"code": "VL308060800","name": "Moha Leaph","lat": "11.869306","lng": "105.420527"}
,{"code": "VL308060900","name": "Pongro","lat": "11.892941","lng": "105.441013"}
,{"code": "VL308061000","name": "Tuol Kdol","lat": "11.883145","lng": "105.406399"}
,{"code": "VL308061100","name": "Veal","lat": "11.885803","lng": "105.393989"}
,{"code": "VL308061200","name": "Tuol Kambot","lat": "11.890711","lng": "105.395997"}
,{"code": "VL308061300","name": "Tuol Theat","lat": "11.887655","lng": "105.401521"}

								]
							}
							,{
								"code": "30807"
								,"name": "Pongro"
								,"villages": [
									{"code": "VL308070100","name": "Kampong Ov Chrueng","lat": "11.900014","lng": "105.457277"}
,{"code": "VL308070200","name": "Preaek Rumdeng Kaeut","lat": "11.88958","lng": "105.450382"}
,{"code": "VL308070300","name": "Preaek Rumdeng Lech","lat": "11.888983","lng": "105.444991"}
,{"code": "VL308070400","name": "Pongro Kaeut","lat": "11.886279","lng": "105.439303"}
,{"code": "VL308070500","name": "Pongro Lech","lat": "11.88461","lng": "105.436371"}
,{"code": "VL308070600","name": "Daeum Sdau","lat": "11.887292","lng": "105.433538"}
,{"code": "VL308070700","name": "Pak Nam","lat": "11.883072","lng": "105.424928"}
,{"code": "VL308070800","name": "Anlong Doung","lat": "11.877753","lng": "105.426407"}

								]
							}
							,{
								"code": "30808"
								,"name": "Preaek Ta Nong"
								,"villages": [
									{"code": "VL308080100","name": "Phum Ti Muoy","lat": "11.913805","lng": "105.285025"}
,{"code": "VL308080200","name": "Phum Ti Pir","lat": "11.907941","lng": "105.280437"}
,{"code": "VL308080300","name": "Phum Ti Bei","lat": "11.912504","lng": "105.283784"}
,{"code": "VL308080400","name": "Phum Ti Buon","lat": "11.9086","lng": "105.29053"}
,{"code": "VL308080500","name": "Phum Ti Pram","lat": "11.900418","lng": "105.279244"}
,{"code": "VL308080600","name": "Phum Ti Prammuoy","lat": "11.902654","lng": "105.276997"}
,{"code": "VL308080700","name": "Phum Ti Prampir","lat": "11.901372","lng": "105.275132"}
,{"code": "VL308080800","name": "Phum Ti Prambei","lat": "11.901372","lng": "105.275132"}
,{"code": "VL308080900","name": "Phum Ti Prambuon","lat": "11.899358","lng": "105.271741"}
,{"code": "VL308081000","name": "Phum Ti Dab","lat": "11.898278","lng": "105.266304"}
,{"code": "VL308081100","name": "Phum Ti Dabmuoy","lat": "11.900636","lng": "105.268804"}
,{"code": "VL308081200","name": "Phum Ti Dabpir","lat": "11.862531","lng": "105.309707"}
,{"code": "VL308081300","name": "Phum Ti Dabbei","lat": "11.853442","lng": "105.284283"}

								]
							}
						]
					}
					,{
						"code":  "311"
						,"name":  "Ou Reang Ov"
						,"communes": [		
							{
								"code": "31101"
								,"name": "Ampil Ta Pok"
								,"villages": [
									{"code": "VL311010100","name": "Tumpeang Bangkang","lat": "11.839096","lng": "105.507384"}
,{"code": "VL311010200","name": "Prey Sralau","lat": "11.808976","lng": "105.495679"}
,{"code": "VL311010300","name": "Lekh Pram","lat": "11.803726","lng": "105.508291"}
,{"code": "VL311010400","name": "Lekh Buon Lech","lat": "11.797143","lng": "105.498311"}
,{"code": "VL311010500","name": "Tuol Tonsaong","lat": "11.790361","lng": "105.476783"}
,{"code": "VL311010600","name": "Svay Ta Thoam","lat": "11.789439","lng": "105.497425"}
,{"code": "VL311010700","name": "Pou Meas","lat": "11.805253","lng": "105.47277"}
,{"code": "VL311010800","name": "Mitt Ta Rach","lat": "11.810655","lng": "105.475845"}
,{"code": "VL311010900","name": "Tuol Ta Lorb","lat": "11.820235","lng": "105.4742"}
,{"code": "VL311011000","name": "Damnak Beng","lat": "11.805429","lng": "105.475203"}
,{"code": "VL311011100","name": "Pou Svay Ming","lat": "11.803076","lng": "105.487224"}
,{"code": "VL311011200","name": "Svay Ming","lat": "11.800009","lng": "105.493047"}
,{"code": "VL311011300","name": "Meas Snae","lat": "11.823549","lng": "105.492557"}
,{"code": "VL311011400","name": "Svay Roluos","lat": "11.817944","lng": "105.486681"}
,{"code": "VL311011500","name": "Chrey Ta Sour","lat": "11.828142","lng": "105.50875"}
,{"code": "VL311011600","name": "Lekh Bei","lat": "11.766109","lng": "105.475548"}
,{"code": "VL311011700","name": "Lekh Buon Kaeut","lat": "11.796878","lng": "105.499595"}
,{"code": "VL311011800","name": "Changvar","lat": "11.783752","lng": "105.491779"}
,{"code": "VL311011900","name": "Bos Lhong","lat": "11.797779","lng": "105.469563"}
,{"code": "VL311012000","name": "Ampil Cheung","lat": "11.779538","lng": "105.481152"}
,{"code": "VL311012100","name": "Ampil Tboung","lat": "11.777903","lng": "105.479938"}
,{"code": "VL311012200","name": "Tumpeang Ruessei","lat": "11.78672","lng": "105.480293"}
,{"code": "VL311012300","name": "Svay Ta Lak","lat": "11.815538","lng": "105.486787"}
,{"code": "VL311012400","name": "Ampil Chum","lat": "11.766451","lng": "105.471428"}

								]
							}
							,{
								"code": "31102"
								,"name": "Chak"
								,"villages": [
									{"code": "VL311020100","name": "Chruol","lat": "11.780216","lng": "105.600161"}
,{"code": "VL311020200","name": "Chamlak","lat": "11.788844","lng": "105.604402"}
,{"code": "VL311020300","name": "Trapeang Kandaol","lat": "11.78659","lng": "105.587875"}
,{"code": "VL311020400","name": "Chamkar Kor","lat": "11.814461","lng": "105.574606"}
,{"code": "VL311020500","name": "Ou Laok","lat": "11.753288","lng": "105.582124"}
,{"code": "VL311020600","name": "Chrouy Ph'ong","lat": "11.743649","lng": "105.636579"}
,{"code": "VL311020700","name": "Chak","lat": "11.775307","lng": "105.595231"}
,{"code": "VL311020800","name": "Pring","lat": "11.785496","lng": "105.596556"}
,{"code": "VL311020900","name": "Trach Chrum","lat": "11.785194","lng": "105.585055"}
,{"code": "VL311021000","name": "Daeum Changkran","lat": "11.81394","lng": "105.57746"}
,{"code": "VL311021100","name": "Prasat","lat": "11.771137","lng": "105.582831"}
,{"code": "VL311021200","name": "Khtom Leav","lat": "11.747327","lng": "105.587131"}
,{"code": "VL311021300","name": "Putthea","lat": "11.75507","lng": "105.590442"}
,{"code": "VL311021400","name": "Trapeang Tea","lat": "11.775567","lng": "105.617534"}
,{"code": "VL311021500","name": "Kouk Ti","lat": "11.786","lng": "105.635254"}
,{"code": "VL311021600","name": "Chumpu","lat": "11.765141","lng": "105.61764"}
,{"code": "VL311021700","name": "Sralong","lat": "11.780165","lng": "105.623988"}

								]
							}
							,{
								"code": "31103"
								,"name": "Damrel"
								,"villages": [
									{"code": "VL311030100","name": "Damrel Ti Muoy","lat": "11.822735","lng": "105.626241"}
,{"code": "VL311030200","name": "Damrel Ti Pir","lat": "11.82413","lng": "105.624822"}
,{"code": "VL311030300","name": "Damrel Ti Bei","lat": "11.822579","lng": "105.622936"}
,{"code": "VL311030400","name": "Damrel Ti Buon","lat": "11.82819","lng": "105.624996"}
,{"code": "VL311030500","name": "Yeak Cheung","lat": "11.818793","lng": "105.621532"}
,{"code": "VL311030600","name": "Yeak Tboung","lat": "11.818412","lng": "105.621972"}
,{"code": "VL311030700","name": "Sangkae","lat": "11.832039","lng": "105.614182"}
,{"code": "VL311030800","name": "Samraong","lat": "11.827406","lng": "105.659804"}
,{"code": "VL311030900","name": "Peuk","lat": "11.823513","lng": "105.665587"}
,{"code": "VL311031000","name": "Chrey Sokhom","lat": "11.831646","lng": "105.595059"}
,{"code": "VL311031100","name": "Kbal Ou","lat": "11.819614","lng": "105.638801"}
,{"code": "VL311031200","name": "Krapeu Sar","lat": "11.821919","lng": "105.635089"}
,{"code": "VL311031300","name": "Sam Snae","lat": "11.828597","lng": "105.645349"}
,{"code": "VL311031400","name": "Srae Sruoch","lat": "11.82504","lng": "105.638896"}
,{"code": "VL311031500","name": "Tuol","lat": "11.820949","lng": "105.594668"}
,{"code": "VL311031600","name": "Thlok","lat": "11.797778","lng": "105.625285"}
,{"code": "VL311031700","name": "Chanlaong","lat": "11.814723","lng": "105.630345"}
,{"code": "VL311031800","name": "Khnab Damrei Cheung","lat": "11.819795","lng": "105.630411"}
,{"code": "VL311031900","name": "Khnab Damrei Tboung","lat": "11.817762","lng": "105.629672"}
,{"code": "VL311032000","name": "Pralay","lat": "11.819073","lng": "105.642077"}

								]
							}
							,{
								"code": "31104"
								,"name": "Kong Chey"
								,"villages": [
									{"code": "VL311040100","name": "Stueng Roang","lat": "11.769933","lng": "105.51782"}
,{"code": "VL311040200","name": "Sokram Chrum","lat": "11.801954","lng": "105.508215"}
,{"code": "VL311040300","name": "Tumneab","lat": "11.810061","lng": "105.521026"}
,{"code": "VL311040400","name": "Lekh Pir","lat": "11.792472","lng": "105.505618"}
,{"code": "VL311040500","name": "Kong Chey","lat": "11.769542","lng": "105.509027"}
,{"code": "VL311040600","name": "Ou Damray","lat": "11.769393","lng": "105.531403"}
,{"code": "VL311040700","name": "Thnal Kaeng","lat": "11.764554","lng": "105.52172"}
,{"code": "VL311040800","name": "Bangkean Sar","lat": "11.769919","lng": "105.495518"}
,{"code": "VL311040900","name": "Tuol Sralau","lat": "11.779029","lng": "105.487741"}
,{"code": "VL311041000","name": "Stueng Chey","lat": "11.769403","lng": "105.510752"}
,{"code": "VL311041100","name": "Tuol Trach","lat": "11.770558","lng": "105.546494"}
,{"code": "VL311041200","name": "Prum Khet","lat": "11.760963","lng": "105.522402"}
,{"code": "VL311041300","name": "Andoung","lat": "11.769858","lng": "105.499381"}
,{"code": "VL311041400","name": "Phum Lekh Muoy","lat": "11.797177","lng": "105.504296"}
,{"code": "VL311041500","name": "Tuol Ta Hao","lat": "11.786824","lng": "105.533236"}
,{"code": "VL311041600","name": "Tuol Sama","lat": "11.792526","lng": "105.500909"}
,{"code": "VL311041700","name": "Changva","lat": "11.769792","lng": "105.54016"}
,{"code": "VL311041800","name": "Soeng","lat": "11.755507","lng": "105.533616"}
,{"code": "VL311041900","name": "Cheung Voat","lat": "11.77852","lng": "105.505235"}
,{"code": "VL311042000","name": "Ou Popul","lat": "11.776264","lng": "105.541687"}
,{"code": "VL311042100","name": "Thmei","lat": "11.786867","lng": "105.50513"}
,{"code": "VL311042200","name": "Srae Spey","lat": "11.814166","lng": "105.531076"}

								]
							}
							,{
								"code": "31105"
								,"name": "Mien"
								,"villages": [
									{"code": "VL311050100","name": "Banteay Mien","lat": "11.803489","lng": "105.45037"}
,{"code": "VL311050200","name": "Saoy","lat": "11.78633","lng": "105.447744"}
,{"code": "VL311050300","name": "Svay Pok","lat": "11.806144","lng": "105.464088"}
,{"code": "VL311050400","name": "Mien","lat": "11.803502","lng": "105.43661"}
,{"code": "VL311050500","name": "Prey Sambuor Kaeut","lat": "11.794887","lng": "105.463362"}
,{"code": "VL311050600","name": "Prey Sambuor Lech","lat": "11.795363","lng": "105.459508"}
,{"code": "VL311050700","name": "Boeng Cheung","lat": "11.813813","lng": "105.441115"}
,{"code": "VL311050800","name": "Thmei","lat": "11.807579","lng": "105.454737"}
,{"code": "VL311050900","name": "Kanlaeng Chak","lat": "11.821729","lng": "105.467603"}
,{"code": "VL311051000","name": "Boeng Kandal","lat": "11.811753","lng": "105.439992"}
,{"code": "VL311051100","name": "Me Loung","lat": "11.809745","lng": "105.434123"}
,{"code": "VL311051200","name": "Kampul Serei","lat": "11.79768","lng": "105.446854"}
,{"code": "VL311051300","name": "Thma Samlieng","lat": "11.807952","lng": "105.447871"}
,{"code": "VL311051400","name": "Thma Prachum","lat": "11.776161","lng": "105.450041"}

								]
							}
							,{
								"code": "31107"
								,"name": "Preah Theat"
								,"villages": [
									{"code": "VL311070100","name": "Ba Srei","lat": "11.861831","lng": "105.480993"}
,{"code": "VL311070200","name": "Kbal Tuek","lat": "11.859337","lng": "105.505851"}
,{"code": "VL311070300","name": "Phnum","lat": "11.849532","lng": "105.517272"}
,{"code": "VL311070400","name": "Tuol Thkov","lat": "11.847461","lng": "105.507059"}
,{"code": "VL311070500","name": "Tuol Mean Chey","lat": "11.883329","lng": "105.479121"}
,{"code": "VL311070600","name": "Tuol Pnov","lat": "11.848746","lng": "105.501269"}
,{"code": "VL311070700","name": "Tuol Khleang","lat": "11.884449","lng": "105.475083"}
,{"code": "VL311070800","name": "Preah Theat Kandal","lat": "11.841491","lng": "105.476495"}
,{"code": "VL311070900","name": "Tuol Sambour","lat": "11.867861","lng": "105.497787"}
,{"code": "VL311071000","name": "Preah Theat Thma Da","lat": "11.843205","lng": "105.473928"}
,{"code": "VL311071100","name": "Trapeang Neang","lat": "11.847369","lng": "105.492857"}
,{"code": "VL311071200","name": "Boeng Kang","lat": "11.879363","lng": "105.455011"}
,{"code": "VL311071300","name": "Chey Saophoan","lat": "11.872247","lng": "105.486869"}
,{"code": "VL311071400","name": "Thmei Kandal","lat": "11.880121","lng": "105.488774"}
,{"code": "VL311071500","name": "Neak Ta Tvear","lat": "11.860068","lng": "105.486104"}
,{"code": "VL311071600","name": "Thnal Kaeng","lat": "11.851268","lng": "105.486621"}
,{"code": "VL311071700","name": "Thmei Leu","lat": "11.873073","lng": "105.500826"}
,{"code": "VL311071800","name": "Srae Mien","lat": "11.882913","lng": "105.457698"}
,{"code": "VL311071900","name": "Phum Dabpir","lat": "11.886078","lng": "105.520233"}
,{"code": "VL311072000","name": "Phum Mpheypram","lat": "11.873701","lng": "105.547773"}
,{"code": "VL311072100","name": "Phum Mphey Prampir","lat": "11.872322","lng": "105.563801"}
,{"code": "VL311072200","name": "Phum Saesebbuon","lat": "11.861565","lng": "105.538099"}

								]
							}
							,{
								"code": "31108"
								,"name": "Tuol Sophi"
								,"villages": [
									{"code": "VL311080100","name": "Kbal Thnal","lat": "11.820111","lng": "105.557176"}
,{"code": "VL311080200","name": "Kbal Peae","lat": "11.794423","lng": "105.56031"}
,{"code": "VL311080300","name": "Thmei","lat": "11.751779","lng": "105.567886"}
,{"code": "VL311080400","name": "Boeng Phtil","lat": "11.804301","lng": "105.563184"}
,{"code": "VL311080500","name": "Ta Ngen","lat": "11.756718","lng": "105.562546"}
,{"code": "VL311080600","name": "Tuol Sopoar","lat": "11.777538","lng": "105.5657"}
,{"code": "VL311080700","name": "Trapeang Ph'av","lat": "11.754181","lng": "105.560393"}
,{"code": "VL311080800","name": "Poung","lat": "11.794565","lng": "105.565937"}
,{"code": "VL311080900","name": "Chan Andaet","lat": "11.804718","lng": "105.557971"}
,{"code": "VL311081000","name": "Trapeang Lvea Tboung","lat": "11.765117","lng": "105.55433"}
,{"code": "VL311081100","name": "Trapeang Lvea Cheung","lat": "11.769866","lng": "105.553523"}
,{"code": "VL311081200","name": "Boeng Kampues","lat": "11.782852","lng": "105.558193"}
,{"code": "VL311081300","name": "Stueng","lat": "11.820392","lng": "105.552266"}
,{"code": "VL311081400","name": "Thma Da Lech","lat": "11.819234","lng": "105.538283"}
,{"code": "VL311081500","name": "Tuol Sophi","lat": "11.769334","lng": "105.571089"}
,{"code": "VL311081600","name": "Damnak Kaev","lat": "11.817521","lng": "105.549782"}
,{"code": "VL311081700","name": "Doun Tes","lat": "11.80876","lng": "105.53985"}
,{"code": "VL311081800","name": "Thma Da Kaeut","lat": "11.819667","lng": "105.548519"}
,{"code": "VL311081900","name": "Kbal Ou","lat": "11.801943","lng": "105.548199"}
,{"code": "VL311082000","name": "Phum Chetseb Prammuoy","lat": "11.827825","lng": "105.55722"}
,{"code": "VL311082100","name": "Phum Hasebbuon","lat": "11.846001","lng": "105.547975"}
,{"code": "VL311082200","name": "Phum Chetsebbei","lat": "11.837367","lng": "105.537712"}

								]
							}

						]
					}
					,{
						"code":  "313"
						,"name":  "Prey Chhor"
						,"communes": [		
							{
								"code": "31301"
								,"name": "Baray"
								,"villages": [
								{"code": "VL313010100","name": "Prey Khchay","lat": "12.075642","lng": "105.248147"}
,{"code": "VL313010200","name": "Tuol Chambak","lat": "12.081166","lng": "105.249512"}
,{"code": "VL313010300","name": "Trapeang Beng","lat": "12.081108","lng": "105.243952"}
,{"code": "VL313010400","name": "Leang Khsach","lat": "12.087253","lng": "105.238628"}
,{"code": "VL313010500","name": "Trapeang Bei","lat": "12.091558","lng": "105.237199"}
,{"code": "VL313010600","name": "Ou Kambaor","lat": "12.09346","lng": "105.234756"}
,{"code": "VL313010700","name": "Kouk Sralau","lat": "12.111389","lng": "105.248933"}
,{"code": "VL313010800","name": "Roung Kou","lat": "12.101833","lng": "105.245579"}
,{"code": "VL313010900","name": "Voat Chas","lat": "12.095426","lng": "105.251041"}
,{"code": "VL313011000","name": "Roul Chruk","lat": "12.110659","lng": "105.266072"}
,{"code": "VL313011100","name": "Prey Rumdeng","lat": "12.090366","lng": "105.225196"}
,{"code": "VL313011200","name": "Samnak Cheung","lat": "12.088931","lng": "105.262926"}
,{"code": "VL313011300","name": "Samnak Tboung","lat": "12.079895","lng": "105.264929"}

								]
							}
							,{
								"code": "31302"
								,"name": "Boeng Nay"
								,"villages": [
								{"code": "VL313020100","name": "Komar Reach","lat": "12.12523","lng": "105.170975"}
,{"code": "VL313020200","name": "Trapeang Anhchanh","lat": "12.112121","lng": "105.147826"}
,{"code": "VL313020300","name": "Thma Da","lat": "12.19026","lng": "105.18327"}
,{"code": "VL313020400","name": "Thma Koul","lat": "12.140181","lng": "105.165957"}
,{"code": "VL313020500","name": "Trapeang Bet","lat": "12.158469","lng": "105.161492"}
,{"code": "VL313020600","name": "Boeng Nay","lat": "12.11005","lng": "105.16422"}
,{"code": "VL313020700","name": "Trapeang Thum","lat": "12.130683","lng": "105.154794"}
,{"code": "VL313020800","name": "Pravas","lat": "12.149541","lng": "105.165705"}
,{"code": "VL313020900","name": "Neak Ta Snoeng","lat": "12.149722","lng": "105.179851"}
,{"code": "VL313021000","name": "Ta Ok","lat": "12.16839","lng": "105.188825"}
,{"code": "VL313021100","name": "Kbal Damrei","lat": "12.125389","lng": "105.145242"}
,{"code": "VL313021200","name": "Tuol Khvav","lat": "12.151953","lng": "105.170606"}
,{"code": "VL313021300","name": "Chhuk Sa","lat": "12.134137","lng": "105.138298"}
,{"code": "VL313021400","name": "Chheu Bak","lat": "12.189235","lng": "105.174022"}
,{"code": "VL313021500","name": "Traeung","lat": "12.190563","lng": "105.161741"}
,{"code": "VL313021600","name": "Chonloat Dai","lat": "12.197059","lng": "105.157369"}
,{"code": "VL313021700","name": "Voat Chas","lat": "12.14349","lng": "105.167301"}

								]
							}
							,{
								"code": "31303"
								,"name": "Chrey Vien"
								,"villages": [
									{"code": "VL313030100","name": "Dai Buon","lat": "12.025624","lng": "105.258399"}
,{"code": "VL313030200","name": "Doun Dei","lat": "12.067146","lng": "105.253174"}
,{"code": "VL313030300","name": "Trapeang Tuk","lat": "12.049481","lng": "105.246432"}
,{"code": "VL313030400","name": "Slaeng","lat": "12.058729","lng": "105.240762"}
,{"code": "VL313030500","name": "Banteay Rueng","lat": "12.039508","lng": "105.233983"}
,{"code": "VL313030600","name": "Tuol Ta Kao","lat": "12.021716","lng": "105.259241"}
,{"code": "VL313030700","name": "Kralaong","lat": "12.042293","lng": "105.235171"}
,{"code": "VL313030800","name": "Ou Kambot","lat": "12.037311","lng": "105.264768"}
,{"code": "VL313030900","name": "Khvet Touch","lat": "12.025232","lng": "105.241127"}
,{"code": "VL313031000","name": "Chrey Vien","lat": "12.040743","lng": "105.259525"}
,{"code": "VL313031100","name": "Trapeang Ampil","lat": "12.025856","lng": "105.251316"}
,{"code": "VL313031200","name": "Ta Ream","lat": "12.049005","lng": "105.253194"}
,{"code": "VL313031300","name": "Klaeng Poar","lat": "12.019035","lng": "105.233221"}
,{"code": "VL313031400","name": "Tuek Nuem","lat": "12.033205","lng": "105.245039"}
,{"code": "VL313031500","name": "Tuol Bak Koam","lat": "12.011651","lng": "105.227813"}
,{"code": "VL313031600","name": "Trapeang Sangkae","lat": "12.040484","lng": "105.24602"}
,{"code": "VL313031700","name": "Prey Totueng","lat": "12.059129","lng": "105.258422"}
,{"code": "VL313031800","name": "Trapeang Pnov","lat": "12.04314","lng": "105.259307"}

								]
							}
							,{
								"code": "31304"
								,"name": "Khvet Thum"
								,"villages": [
									{"code": "VL313040100","name": "Khvet Thum","lat": "12.057535","lng": "105.218664"}
,{"code": "VL313040200","name": "Baray","lat": "12.072682","lng": "105.218805"}
,{"code": "VL313040300","name": "Angkrang","lat": "12.059227","lng": "105.22925"}
,{"code": "VL313040400","name": "Ta Ngal","lat": "12.048484","lng": "105.217223"}
,{"code": "VL313040500","name": "Ampil Thum","lat": "12.057882","lng": "105.201537"}
,{"code": "VL313040600","name": "Dangkao","lat": "12.074329","lng": "105.205528"}
,{"code": "VL313040700","name": "Pratheat","lat": "12.066471","lng": "105.204659"}
,{"code": "VL313040800","name": "Kabbas","lat": "12.053919","lng": "105.216704"}

								]
							}
							,{
								"code": "31305"
								,"name": "Kor"
								,"villages": [
									{"code": "VL313050100","name": "Doun Lei","lat": "12.126077","lng": "105.202544"}
,{"code": "VL313050200","name": "Mrenh","lat": "12.123587","lng": "105.206522"}
,{"code": "VL313050300","name": "Ta Meas","lat": "12.12077","lng": "105.211823"}
,{"code": "VL313050400","name": "Ta Kaev","lat": "12.118781","lng": "105.212225"}
,{"code": "VL313050500","name": "Ta Ley","lat": "12.120822","lng": "105.226996"}
,{"code": "VL313050600","name": "Ta Mout","lat": "12.11308","lng": "105.216246"}
,{"code": "VL313050700","name": "Rumduol","lat": "12.100292","lng": "105.228715"}
,{"code": "VL313050800","name": "Svay Pen","lat": "12.104502","lng": "105.211111"}
,{"code": "VL313050900","name": "Kraoy Voat","lat": "12.109052","lng": "105.20992"}
,{"code": "VL313051000","name": "Trapeang Poun","lat": "12.103253","lng": "105.200708"}

								]
							}
							,{
								"code": "31306"
								,"name": "Krouch"
								,"villages": [
								{"code": "VL313060100","name": "Ou Chrok","lat": "12.14245","lng": "105.18241"}
,{"code": "VL313060200","name": "Prey Sak","lat": "12.125765","lng": "105.181829"}
,{"code": "VL313060300","name": "Tuol Khpos","lat": "12.134783","lng": "105.19246"}
,{"code": "VL313060400","name": "Krasang Ta Mong","lat": "12.117802","lng": "105.1906"}
,{"code": "VL313060500","name": "Krouch","lat": "12.114621","lng": "105.185911"}
,{"code": "VL313060600","name": "Thmei","lat": "12.157931","lng": "105.197247"}
,{"code": "VL313060700","name": "Samraong","lat": "12.116068","lng": "105.185949"}

								]
							}
							,{
								"code": "31307"
								,"name": "Lvea"
								,"villages": [
								{"code": "VL313070100","name": "Kok","lat": "12.038634","lng": "105.195404"}
,{"code": "VL313070200","name": "Trapeang Chi Neang","lat": "12.040367","lng": "105.173365"}
,{"code": "VL313070300","name": "Kouk Trea Kaeut","lat": "12.04012","lng": "105.190959"}
,{"code": "VL313070400","name": "Kouk Trea Lech","lat": "12.040721","lng": "105.18428"}
,{"code": "VL313070500","name": "Sdok Antong","lat": "12.05088","lng": "105.19353"}
,{"code": "VL313070600","name": "Ta Chak","lat": "12.045516","lng": "105.181517"}
,{"code": "VL313070700","name": "Me Meang","lat": "12.032955","lng": "105.166717"}
,{"code": "VL313070800","name": "Tang Kouk","lat": "12.04714","lng": "105.17257"}
,{"code": "VL313070900","name": "Lvea","lat": "12.05792","lng": "105.18702"}
,{"code": "VL313071000","name": "Tang Trapeang","lat": "12.038804","lng": "105.169597"}

								]
							}
							,{
								"code": "31308"
								,"name": "Mien"
								,"villages": [
									{"code": "VL313080100","name": "Tuol Prich","lat": "12.019956","lng": "105.309527"}
,{"code": "VL313080200","name": "Ou Sangkae","lat": "12.030586","lng": "105.288207"}
,{"code": "VL313080300","name": "Keh","lat": "12.013649","lng": "105.296852"}
,{"code": "VL313080400","name": "Trapeang Chhuk","lat": "12.044765","lng": "105.297529"}
,{"code": "VL313080500","name": "Nam Ken","lat": "12.039246","lng": "105.273636"}
,{"code": "VL313080600","name": "Mien","lat": "12.053352","lng": "105.30148"}
,{"code": "VL313080700","name": "Tuol Poun","lat": "12.051872","lng": "105.306991"}
,{"code": "VL313080800","name": "Phkay Proek","lat": "12.052762","lng": "105.32783"}
,{"code": "VL313080900","name": "Kampong Samret","lat": "12.023026","lng": "105.337174"}
,{"code": "VL313081000","name": "Krasang Pul","lat": "12.048735","lng": "105.344777"}
,{"code": "VL313081100","name": "Damnak Pongro","lat": "12.028696","lng": "105.306046"}
,{"code": "VL313081200","name": "Kampong Samnanh","lat": "12.008211","lng": "105.323826"}
,{"code": "VL313081300","name": "Ou Ta Nov","lat": "12.043726","lng": "105.269828"}
,{"code": "VL313081400","name": "Dei Kraham","lat": "12.027306","lng": "105.294671"}
,{"code": "VL313081500","name": "Khlouy Ti Muoy","lat": "12.048187","lng": "105.286186"}
,{"code": "VL313081600","name": "Khlouy Ti Pir","lat": "12.03965","lng": "105.294528"}
,{"code": "VL313081700","name": "Khlouy Ti Bei","lat": "12.033233","lng": "105.299648"}
,{"code": "VL313081800","name": "Khlouy Ti Buon","lat": "12.037262","lng": "105.286349"}
,{"code": "VL313081900","name": "Traeung","lat": "12.051563","lng": "105.354308"}

								]
							}
							,{
								"code": "31309"
								,"name": "Prey Chhor"
								,"villages": [
								{"code": "VL313090100","name": "Prey Chhor","lat": "12.074206","lng": "105.187482"}
,{"code": "VL313090200","name": "Sek Yum","lat": "12.078926","lng": "105.18902"}
,{"code": "VL313090300","name": "Chres","lat": "12.087847","lng": "105.207349"}
,{"code": "VL313090400","name": "Sangkae","lat": "12.082247","lng": "105.198468"}

								]
							}
							,{
								"code": "31310"
								,"name": "Sour Saen"
								,"villages": [
								{"code": "VL313100100","name": "Sour Saen","lat": "12.083091","lng": "105.167263"}
,{"code": "VL313100200","name": "Andoung","lat": "12.08834","lng": "105.159465"}
,{"code": "VL313100300","name": "Trapeang Reang","lat": "12.075045","lng": "105.145931"}
,{"code": "VL313100400","name": "Trapeang Tnaot","lat": "12.072639","lng": "105.129206"}
,{"code": "VL313100500","name": "Traeuy Ou","lat": "12.079757","lng": "105.125966"}
,{"code": "VL313100600","name": "Trapeang Tbal","lat": "12.090853","lng": "105.145195"}
,{"code": "VL313100700","name": "Chambak Thma","lat": "12.080928","lng": "105.153396"}
,{"code": "VL313100800","name": "Svay Reaks","lat": "12.099214","lng": "105.134696"}

								]
							}
							,{
								"code": "31311"
								,"name": "Samraong"
								,"villages": [
								{"code": "VL313110100","name": "Banteay Thmei","lat": "12.018989","lng": "105.140067"}
,{"code": "VL313110200","name": "Ta Kret","lat": "12.020728","lng": "105.135162"}
,{"code": "VL313110300","name": "Kandaol Kaong","lat": "12.021743","lng": "105.129439"}
,{"code": "VL313110400","name": "Tumpeang Ruessei","lat": "12.04102","lng": "105.116742"}
,{"code": "VL313110500","name": "Svay Prey","lat": "12.031131","lng": "105.127294"}
,{"code": "VL313110600","name": "Samraong","lat": "12.028034","lng": "105.135754"}
,{"code": "VL313110700","name": "Soudei","lat": "12.041268","lng": "105.129311"}
,{"code": "VL313110800","name": "Thmei","lat": "12.027382","lng": "105.138298"}
,{"code": "VL313110900","name": "Veal","lat": "12.024789","lng": "105.132243"}
,{"code": "VL313111000","name": "Smer","lat": "12.021356","lng": "105.125617"}
,{"code": "VL313111100","name": "Prey Khchay","lat": "12.043426","lng": "105.115705"}

								]
							}
							,{
								"code": "31312"
								,"name": "Sragnae"
								,"villages": [
								{"code": "VL313120100","name": "Srangae Cheung","lat": "12.05584","lng": "105.156763"}
,{"code": "VL313120200","name": "Srangae Tboung","lat": "12.055042","lng": "105.160952"}
,{"code": "VL313120300","name": "Senson Tboung","lat": "12.045402","lng": "105.144969"}
,{"code": "VL313120400","name": "Senson Cheung","lat": "12.053077","lng": "105.148712"}
,{"code": "VL313120500","name": "Ta Sar","lat": "12.055491","lng": "105.166924"}
,{"code": "VL313120600","name": "Ta Koch","lat": "12.058665","lng": "105.132958"}
,{"code": "VL313120700","name": "Trapeang Thum","lat": "12.050078","lng": "105.124354"}
,{"code": "VL313120800","name": "Trapeang Rung","lat": "12.05421","lng": "105.143954"}

								]
							}
							,{
								"code": "31313"
								,"name": "Thma Pun"
								,"villages": [
								{"code": "VL313130100","name": "Trang","lat": "12.141039","lng": "105.242086"}
,{"code": "VL313130200","name": "Andoung Taa Pechr","lat": "12.149738","lng": "105.242075"}
,{"code": "VL313130300","name": "Trapeang Boeng","lat": "12.152177","lng": "105.244578"}
,{"code": "VL313130400","name": "Tuol Thma","lat": "12.16044","lng": "105.247435"}
,{"code": "VL313130500","name": "Lech Voat","lat": "12.145173","lng": "105.240114"}
,{"code": "VL313130600","name": "Andoung Phdau","lat": "12.134748","lng": "105.23856"}
,{"code": "VL313130700","name": "Thma Pun Kandal","lat": "12.155145","lng": "105.243468"}
,{"code": "VL313130800","name": "Andoung Ta Loeng","lat": "12.16771","lng": "105.23813"}
,{"code": "VL313130900","name": "Ou Ta Thok","lat": "12.174619","lng": "105.227602"}

								]
							}
							,{
								"code": "31314"
								,"name": "Tong Rong"
								,"villages": [
								{"code": "VL313140100","name": "Tong Rong","lat": "12.034006","lng": "105.216651"}
,{"code": "VL313140200","name": "Phteah Khpos","lat": "12.029609","lng": "105.218678"}
,{"code": "VL313140300","name": "Thnong","lat": "12.026948","lng": "105.209902"}
,{"code": "VL313140400","name": "Prasat","lat": "12.015328","lng": "105.221266"}
,{"code": "VL313140500","name": "Samraong","lat": "12.032259","lng": "105.20727"}
,{"code": "VL313140600","name": "Preah Srok","lat": "12.034957","lng": "105.203339"}
,{"code": "VL313140700","name": "Kok Kandal","lat": "12.038554","lng": "105.2063"}
,{"code": "VL313140800","name": "Tro Mukh Ti Muoy","lat": "12.036267","lng": "105.204783"}
,{"code": "VL313140900","name": "Tro Mukh Ti Pir","lat": "12.03776","lng": "105.203378"}
,{"code": "VL313141000","name": "Doung","lat": "12.028698","lng": "105.216426"}

								]
							}
							,{
								"code": "31315"
								,"name": "Trapeang Preah"
								,"villages": [
									{"code": "VL313150100","name": "Kaoh Svay","lat": "12.083544","lng": "105.328392"}
,{"code": "VL313150200","name": "Pring Bei Daeum","lat": "12.059045","lng": "105.270468"}
,{"code": "VL313150300","name": "Chachak","lat": "12.081223","lng": "105.30991"}
,{"code": "VL313150400","name": "Prey Sralau","lat": "12.065542","lng": "105.266633"}
,{"code": "VL313150500","name": "Puon Pramat","lat": "12.105219","lng": "105.329521"}
,{"code": "VL313150600","name": "Kur","lat": "12.095936","lng": "105.310359"}
,{"code": "VL313150700","name": "Sbaeng","lat": "12.061271","lng": "105.287431"}
,{"code": "VL313150800","name": "Prey Sralanh","lat": "12.067291","lng": "105.271863"}
,{"code": "VL313150900","name": "Trapeang Leak","lat": "12.105937","lng": "105.326149"}
,{"code": "VL313151000","name": "Ou Da","lat": "12.055767","lng": "105.283585"}
,{"code": "VL313151100","name": "Trapeang Reang","lat": "12.073311","lng": "105.300841"}
,{"code": "VL313151200","name": "Tuol Ampil","lat": "12.06357","lng": "105.310303"}
,{"code": "VL313151300","name": "Ta Lon","lat": "12.089818","lng": "105.298002"}
,{"code": "VL313151400","name": "Kaoh Kaphem","lat": "12.088271","lng": "105.322599"}
,{"code": "VL313151500","name": "Trapeang svay","lat": "12.085857","lng": "105.289249"}
,{"code": "VL313151600","name": "Ang","lat": "12.099104","lng": "105.29905"}
,{"code": "VL313151700","name": "Doung","lat": "12.077002","lng": "105.273555"}
,{"code": "VL313151800","name": "Tonle Sar","lat": "12.0952","lng": "105.288221"}
,{"code": "VL313151900","name": "Kakaoh","lat": "12.053454","lng": "105.315547"}
,{"code": "VL313152000","name": "Ou Doun Nhea","lat": "12.106212","lng": "105.290236"}
,{"code": "VL313152100","name": "Khvav","lat": "12.054931","lng": "105.343489"}
,{"code": "VL313152200","name": "Dei Lou","lat": "12.056779","lng": "105.302219"}
,{"code": "VL313152300","name": "Roluos","lat": "12.088157","lng": "105.349991"}
,{"code": "VL313152400","name": "Trapeang Krasang","lat": "12.055224","lng": "105.301372"}

								]
							}
						]
					}
					,{
						"code":  "314"
						,"name":  "Srei Santhor"
						,"communes": [		
							{
								"code": "31401"
								,"name": "Baray"
								,"villages": [
								{"code": "VL314010100","name": "Sya Boeng Veaeng","lat": "11.868074","lng": "105.22335"}
,{"code": "VL314010200","name": "Sya Ampil","lat": "11.84817","lng": "105.198756"}
,{"code": "VL314010300","name": "Banteay","lat": "11.854323","lng": "105.194537"}
,{"code": "VL314010400","name": "Kamphlak","lat": "11.849123","lng": "105.193873"}

								]
							}
							,{
								"code": "31402"
								,"name": "Chi Bal"
								,"villages": [
								{"code": "VL314020100","name": "Khnaor Doung","lat": "11.7363","lng": "105.100928"}
,{"code": "VL314020200","name": "Slaeng","lat": "11.760776","lng": "105.08717"}
,{"code": "VL314020300","name": "Chi Bal","lat": "11.746421","lng": "105.098371"}
,{"code": "VL314020400","name": "Tang Krang","lat": "11.742331","lng": "105.104115"}
,{"code": "VL314020500","name": "Khyaong","lat": "11.761939","lng": "105.100157"}

								]
							}
							,{
								"code": "31403"
								,"name": "Khnar Sa"
								,"villages": [
								{"code": "VL314030100","name": "Ang","lat": "11.775662","lng": "105.088276"}
,{"code": "VL314030200","name": "Kngaok","lat": "11.787626","lng": "105.089005"}
,{"code": "VL314030300","name": "Trea Sa","lat": "11.802276","lng": "105.114822"}
,{"code": "VL314030400","name": "Khnar Sar","lat": "11.792767","lng": "105.10172"}
,{"code": "VL314030500","name": "Ampil","lat": "11.78209","lng": "105.092509"}

								]
							}
							,{
								"code": "31404"
								,"name": "Kaoh Andaet"
								,"villages": [
								{"code": "VL314040100","name": "Kbal Kaoh","lat": "11.92404","lng": "105.269222"}
,{"code": "VL314040200","name": "Kokir","lat": "11.921956","lng": "105.254003"}
,{"code": "VL314040300","name": "Chong Kaoh","lat": "11.911119","lng": "105.247454"}
,{"code": "VL314040400","name": "Krouch Saeuch","lat": "11.904834","lng": "105.266935"}

								]
							}
							,{
								"code": "31405"
								,"name": "Mean Chey"
								,"villages": [
								{"code": "VL314050100","name": "Veal","lat": "11.836812","lng": "105.055897"}
,{"code": "VL314050200","name": "Moan Dab Leu","lat": "11.83889","lng": "105.067786"}
,{"code": "VL314050300","name": "Moan Dab Kraom","lat": "11.838294","lng": "105.063719"}
,{"code": "VL314050400","name": "Kaoh Kou","lat": "11.835493","lng": "105.053335"}
,{"code": "VL314050500","name": "Chey","lat": "11.840522","lng": "105.043568"}
,{"code": "VL314050600","name": "Samraong","lat": "11.836664","lng": "105.074221"}
,{"code": "VL314050700","name": "Pok Paen","lat": "11.821908","lng": "105.061613"}

								]
							}
							,{
								"code": "31406"
								,"name": "Phteas Kandal"
								,"villages": [
								{"code": "VL314060100","name": "Ou Leav","lat": "11.858228","lng": "105.135375"}
,{"code": "VL314060200","name": "Phteah Kandal Leu","lat": "11.853255","lng": "105.132518"}
,{"code": "VL314060300","name": "Phteah Kandal Kraom","lat": "11.845218","lng": "105.127088"}
,{"code": "VL314060400","name": "Chong Boeng Krau","lat": "11.87299","lng": "105.146851"}

								]
							}
							,{
								"code": "31407"
								,"name": "Pram Yam"
								,"villages": [
								{"code": "VL314070100","name": "Pram Yam","lat": "11.788339","lng": "105.156058"}
,{"code": "VL314070200","name": "Kdei Thka","lat": "11.797363","lng": "105.158523"}
,{"code": "VL314070300","name": "Cheung Doek","lat": "11.799464","lng": "105.152035"}
,{"code": "VL314070400","name": "Chi Pray","lat": "11.800412","lng": "105.156175"}

								]
							}
							,{
								"code": "31408"
								,"name": "Preaek Dambouk"
								,"villages": [
								{"code": "VL314080100","name": "Ta Kay","lat": "11.900102","lng": "105.162807"}
,{"code": "VL314080200","name": "Ta Meun","lat": "11.894977","lng": "105.173097"}
,{"code": "VL314080300","name": "Ta Mol","lat": "11.895157","lng": "105.159966"}
,{"code": "VL314080400","name": "Chong Boeng Knong","lat": "11.875982","lng": "105.14856"}
,{"code": "VL314080500","name": "Preaek Dambouk Kraom","lat": "11.88521","lng": "105.157977"}
,{"code": "VL314080600","name": "Preaek Dambouk Leu","lat": "11.888936","lng": "105.159421"}
,{"code": "VL314080700","name": "Svay Mou","lat": "11.892931","lng": "105.162086"}
,{"code": "VL314080800","name": "Ampil","lat": "11.896937","lng": "105.162511"}
,{"code": "VL314080900","name": "Phteah Veal","lat": "11.885105","lng": "105.153019"}

								]
							}
							,{
								"code": "31409"
								,"name": "Preaek Pou"
								,"villages": [
								{"code": "VL314090100","name": "Roka Tvear","lat": "11.836046","lng": "105.111036"}
,{"code": "VL314090200","name": "Preaek Pou Leu","lat": "11.842427","lng": "105.120036"}
,{"code": "VL314090300","name": "Preaek Pou Kraom","lat": "11.835366","lng": "105.115552"}
,{"code": "VL314090400","name": "Chras","lat": "11.827902","lng": "105.099373"}
,{"code": "VL314090500","name": "Prathnal","lat": "11.833528","lng": "105.096006"}
,{"code": "VL314090600","name": "Kouk Char","lat": "11.826869","lng": "105.105377"}
,{"code": "VL314090700","name": "Santey","lat": "11.834998","lng": "105.106656"}
,{"code": "VL314090800","name": "Thma Da","lat": "11.839176","lng": "105.079473"}
,{"code": "VL314090900","name": "Turi Leu","lat": "11.83568","lng": "105.096677"}
,{"code": "VL314091000","name": "Turi Kandal","lat": "11.832038","lng": "105.087982"}
,{"code": "VL314091100","name": "Turi Kraom","lat": "11.837728","lng": "105.085413"}
,{"code": "VL314091200","name": "Prey Tbeh","lat": "11.816093","lng": "105.09376"}

								]
							}
							,{
								"code": "31410"
								,"name": "Preaek Rumdeng"
								,"villages": [
								{"code": "VL314100100","name": "Kser","lat": "11.877243","lng": "105.247396"}
,{"code": "VL314100200","name": "Ou Leaeng","lat": "11.918145","lng": "105.237809"}
,{"code": "VL314100300","name": "Tnaot Ka","lat": "11.912102","lng": "105.239503"}
,{"code": "VL314100400","name": "Tnaot Kha","lat": "11.916446","lng": "105.236531"}
,{"code": "VL314100500","name": "Preaek Rumdeng Ka","lat": "11.901179","lng": "105.25852"}
,{"code": "VL314100600","name": "Preaek Rumdeng Kha","lat": "11.897207","lng": "105.261115"}
,{"code": "VL314100700","name": "Preaek Rumdeng Kho","lat": "11.893282","lng": "105.260771"}
,{"code": "VL314100800","name": "Preaek Ouv Chrueng Ka","lat": "11.906761","lng": "105.246284"}
,{"code": "VL314100900","name": "Preaek Ouv Chrueng Kha","lat": "11.910454","lng": "105.242816"}
,{"code": "VL314101000","name": "Svay Ta Noan Ka","lat": "11.90283","lng": "105.25269"}
,{"code": "VL314101100","name": "Svay Ta Noan Kha","lat": "11.904217","lng": "105.249422"}
,{"code": "VL314101200","name": "Kampong Pnov","lat": "11.837611","lng": "105.261627"}
,{"code": "VL314101300","name": "Ta Koch","lat": "11.918169","lng": "105.230618"}
,{"code": "VL314101400","name": "Ta Ngak Thmei","lat": "11.818481","lng": "105.255082"}

								]
							}
							,{
								"code": "31411"
								,"name": "Ruessei Srok"
								,"villages": [
								{"code": "VL314110100","name": "Tnaot Kraom","lat": "11.926329","lng": "105.190171"}
,{"code": "VL314110200","name": "Prey Totueng","lat": "11.917465","lng": "105.216512"}
,{"code": "VL314110300","name": "Ruessei Srok","lat": "11.930488","lng": "105.203656"}
,{"code": "VL314110400","name": "Tnaot Leu","lat": "11.928757","lng": "105.196345"}

								]
							}
							,{
								"code": "31412"
								,"name": "Svay Pou"
								,"villages": [
								{"code": "VL314120100","name": "Pou","lat": "11.795848","lng": "105.082334"}
,{"code": "VL314120200","name": "Svay","lat": "11.785359","lng": "105.078531"}
,{"code": "VL314120300","name": "Chi Pao","lat": "11.774243","lng": "105.082603"}
,{"code": "VL314120400","name": "Tea Hean","lat": "11.770962","lng": "105.079426"}
,{"code": "VL314120500","name": "Trea","lat": "11.79657","lng": "105.088071"}
,{"code": "VL314120600","name": "Khvet","lat": "11.791686","lng": "105.088593"}

								]
							}
							,{
								"code": "31413"
								,"name": "Svaysach Phnum"
								,"villages": [
								{"code": "VL314130100","name": "Svay Leu","lat": "11.921134","lng": "105.181673"}
,{"code": "VL314130200","name": "Svay Kandal","lat": "11.918458","lng": "105.181139"}
,{"code": "VL314130300","name": "Svay Tboung","lat": "11.916595","lng": "105.180825"}
,{"code": "VL314130400","name": "Svay Kraom","lat": "11.913155","lng": "105.172769"}

								]
							}
							,{
								"code": "31414"
								,"name": "Tong Tralach"
								,"villages": [
								{"code": "VL314140100","name": "Tong Tralach","lat": "11.783244","lng": "105.104598"}
,{"code": "VL314140200","name": "Boeng Ting","lat": "11.754931","lng": "105.158857"}
,{"code": "VL314140300","name": "Khting","lat": "11.767976","lng": "105.11065"}
,{"code": "VL314140400","name": "Chonloat Dai","lat": "11.776221","lng": "105.116831"}

								]
							}
						]
					}
					,{
						"code":  "315"
						,"name":  "Stueng Trang"
						,"communes": [		
							{
								"code": "31506"
								,"name": "Ou Mlu"
								,"villages": [
								{"code": "VL315060100","name": "Khtuoy Ti Muoy","lat": "12.398219","lng": "105.535884"}
,{"code": "VL315060200","name": "Khtuoy Ti Pir","lat": "12.400091","lng": "105.535823"}
,{"code": "VL315060300","name": "Khtuoy Ti Bei","lat": "12.401496","lng": "105.534189"}
,{"code": "VL315060400","name": "Khtuoy Ti Buon","lat": "12.391829","lng": "105.543451"}
,{"code": "VL315060500","name": "Ou Pralaoh","lat": "12.362301","lng": "105.531478"}
,{"code": "VL315060600","name": "Ou Kab Moan","lat": "12.382134","lng": "105.525502"}
,{"code": "VL315060700","name": "Ou Ruessei","lat": "12.415244","lng": "105.499238"}
,{"code": "VL315060800","name": "Ou Ta Sek","lat": "12.441396","lng": "105.541244"}
,{"code": "VL315060900","name": "Samraong","lat": "12.440108","lng": "105.556782"}
,{"code": "VL315061000","name": "Pratong","lat": "12.453926","lng": "105.586026"}
,{"code": "VL315061100","name": "Bet Thnu","lat": "12.427249","lng": "105.582673"}
,{"code": "VL315061200","name": "Spong Sakha Thmei","lat": "12.420403","lng": "105.565885"}
,{"code": "VL315061300","name": "Spong Sakha Chas","lat": "12.370017","lng": "105.543599"}

								]
							}
						]
					}

				]
			}
			,{
				"code": "04"
				,"name": "Kampong Chhnang"
				,"districts":[
					{
						"code":  "401"
						,"name":  "Baribour"
						,"communes": [
							{
								"code": "40101",
								"name": "Anh Chanh Roung"
								,"villages": [
									{"code": "VL401010100","name": "Anhchanh Rung","lat": "12.352188","lng": "104.418838"}
,{"code": "VL401010200","name": "Andoung Rovieng","lat": "12.369219","lng": "104.446589"}
,{"code": "VL401010300","name": "Damrei Koun","lat": "12.358569","lng": "104.430321"}
,{"code": "VL401010400","name": "Prey Preal","lat": "12.353488","lng": "104.448498"}
,{"code": "VL401010500","name": "Stueng Thmei","lat": "12.392577","lng": "104.446816"}
,{"code": "VL401010600","name": "Thlok Chrov","lat": "12.390441","lng": "104.42431"}
,{"code": "VL401010700","name": "Krang Sleng","lat": "12.343109","lng": "104.385346"}
,{"code": "VL401010800","name": "Trapuon","lat": "12.333709","lng": "104.363948"}
,{"code": "VL401010900","name": "Damnak Cham","lat": "12.323233","lng": "104.342591"}
,{"code": "VL401011000","name": "Kampot Sbov","lat": "12.325172","lng": "104.37518"}
,{"code": "VL401011100","name": "O Rolous","lat": "","lng": ""}

								]
							}
							,{
								"code": "40102",
								"name": "Chhnok Tru"
								,"villages": [
									{"code": "VL401020100","name": "Chhnok Tru","lat": "12.497341","lng": "104.45391"}
,{"code": "VL401020200","name": "Kampong Preah","lat": "12.494575","lng": "104.472828"}
,{"code": "VL401020300","name": "Seh Slab","lat": "12.482461","lng": "104.493181"}

								]
							}
							,{
								"code": "40103",
								"name": "Chak"
								,"villages": [
									{"code": "VL401030100","name": "Ta Pang","lat": "12.452193","lng": "104.450407"}
,{"code": "VL401030200","name": "Pou Mreah","lat": "12.46407","lng": "104.452296"}
,{"code": "VL401030300","name": "Ou Rumchek","lat": "12.453227","lng": "104.447691"}
,{"code": "VL401030400","name": "Chak","lat": "12.46082","lng": "104.446101"}
,{"code": "VL401030500","name": "Dangkhau Mau","lat": "12.464921","lng": "104.439651"}

								]
							}
							,{
								"code": "40104",
								"name": "Khon Rang"
								,"villages": [
									{"code": "VL401040100","name": "Snao","lat": "12.406586","lng": "104.484809"}
,{"code": "VL401040200","name": "Daeum Chreae","lat": "12.417212","lng": "104.471108"}
,{"code": "VL401040300","name": "Serei","lat": "12.420015","lng": "104.489815"}
,{"code": "VL401040400","name": "Lbaeuk","lat": "12.432121","lng": "104.483903"}
,{"code": "VL401040500","name": "Kansaeng","lat": "12.433831","lng": "104.470172"}
,{"code": "VL401040600","name": "Dak Por","lat": "12.439497","lng": "104.472995"}
,{"code": "VL401040700","name": "Kok","lat": "12.443021","lng": "104.471883"}
,{"code": "VL401040800","name": "Popel","lat": "12.42256","lng": "104.477528"}
,{"code": "VL401040900","name": "Trapeang Pou","lat": "12.446138","lng": "104.48452"}
,{"code": "VL401041000","name": "Kampong Uor","lat": "12.441293","lng": "104.47104"}

								]
							}
							,{
								"code": "40105",
								"name": "Kampong Preah Kokir"
								,"villages": [
									{"code": "VL401050100","name": "Preaek Spean","lat": "12.375354","lng": "104.586407"}
,{"code": "VL401050200","name": "Kaoh Ta Mouv","lat": "12.387951","lng": "104.563591"}
,{"code": "VL401050300","name": "Stueng Chrov","lat": "12.367832","lng": "104.593392"}
,{"code": "VL401050400","name": "Damnak Reach","lat": "12.392524","lng": "104.608671"}

								]
							}
							,{
								"code": "40106",
								"name": "Melum"
								,"villages": [
									{"code": "VL401060100","name": "Srah Kaev","lat": "12.386211","lng": "104.498243"}
,{"code": "VL401060200","name": "Tuol Thlok","lat": "12.374536","lng": "104.522688"}
,{"code": "VL401060300","name": "Melum","lat": "12.38528","lng": "104.513405"}
,{"code": "VL401060400","name": "Kan Yuor","lat": "12.387325","lng": "104.504119"}
,{"code": "VL401060500","name": "Tuol Roka","lat": "12.379521","lng": "104.513894"}

								]
							}
							,{
								"code": "40107",
								"name": "Phsar"
								,"villages": [
									{"code": "VL401070100","name": "Kbal Thnal","lat": "12.399293","lng": "104.477519"}
,{"code": "VL401070200","name": "Kamprong","lat": "12.400533","lng": "104.48311"}
,{"code": "VL401070300","name": "Phsar","lat": "12.380371","lng": "104.484631"}
,{"code": "VL401070400","name": "Thmei","lat": "12.366941","lng": "104.498418"}
,{"code": "VL401070500","name": "Chumteav Botrei","lat": "12.385765","lng": "104.491906"}
,{"code": "VL401070600","name": "Prey Ta Mung","lat": "12.391009","lng": "104.481914"}
,{"code": "VL401070700","name": "Phniet","lat": "12.394517","lng": "104.486599"}

								]
							}
							,{
								"code": "40108",
								"name": "Pech Changva"
								,"villages": [
									{"code": "VL401080100","name": "Tang Thnuem","lat": "12.35297","lng": "104.371854"}
,{"code": "VL401080200","name": "Tang Trapeang","lat": "12.368321","lng": "104.386148"}
,{"code": "VL401080300","name": "Lvea","lat": "12.371097","lng": "104.402763"}
,{"code": "VL401080400","name": "Krang Kakaoh","lat": "12.398511","lng": "104.396896"}
,{"code": "VL401080500","name": "Tuek Chroab","lat": "12.4072","lng": "104.405018"}
,{"code": "VL401080600","name": "Thnal","lat": "12.391688","lng": "104.39073"}

								]
							}
							,{
								"code": "40109",
								"name": "Popel"
								,"villages": [
									{"code": "VL401090100","name": "Cheang Luong","lat": "12.421071","lng": "104.442919"}
,{"code": "VL401090200","name": "Ou","lat": "12.425757","lng": "104.45728"}
,{"code": "VL401090300","name": "Tuol Pou","lat": "12.415871","lng": "104.451771"}
,{"code": "VL401090400","name": "Kraol Chi","lat": "12.410484","lng": "104.443622"}
,{"code": "VL401090500","name": "Bos Meas","lat": "12.410499","lng": "104.455573"}
,{"code": "VL401090600","name": "Sala Khum","lat": "12.421642","lng": "104.461567"}
,{"code": "VL401090700","name": "Krang Khmaer","lat": "12.415599","lng": "104.460301"}
,{"code": "VL401090800","name": "Angk","lat": "12.405351","lng": "104.472447"}

								]
							}
							,{
								"code": "40110",
								"name": "Ponley"
								,"villages": [
									{"code": "VL401100100","name": "Ponley","lat": "12.43889","lng": "104.46316"}
,{"code": "VL401100200","name": "Cheung Khnar","lat": "12.442849","lng": "104.462195"}
,{"code": "VL401100300","name": "Kaev Lat","lat": "12.443511","lng": "104.458835"}
,{"code": "VL401100400","name": "Svay Koy","lat": "12.452296","lng": "104.461117"}
,{"code": "VL401100500","name": "Ou","lat": "12.43747","lng": "104.449794"}
,{"code": "VL401100600","name": "Cheang Luong","lat": "12.439255","lng": "104.455872"}

								]
							}
							,{
								"code": "40111",
								"name": "Trapeang Chan"
								,"villages": [
									{"code": "VL401110100","name": "Trapeang Chan","lat": "12.475615","lng": "104.421003"}
,{"code": "VL401110200","name": "Kandal","lat": "12.480602","lng": "104.427305"}
,{"code": "VL401110300","name": "Sanlang","lat": "12.467903","lng": "104.429835"}
,{"code": "VL401110400","name": "Kbal Damrei","lat": "12.472139","lng": "104.386512"}
,{"code": "VL401110500","name": "Kraboa","lat": "0","lng": "0"}

								]
							}
						]
					}
					,{
						"code":  "402"
						,"name":  "Chol Kiri"
						,"communes": [
							{
								"code": "40201",
								"name": "Chol Sar"
								,"villages": [
									{"code": "VL402010100","name": "Kampong Khlanh","lat": "12.163232","lng": "104.833598"}
,{"code": "VL402010200","name": "Tonle Krau","lat": "12.166793","lng": "104.830139"}
,{"code": "VL402010300","name": "Ruessei Dangkuoch","lat": "12.165809","lng": "104.849599"}
,{"code": "VL402010400","name": "Preaek Trob","lat": "12.125337","lng": "104.859786"}
,{"code": "VL402010500","name": "Kampong Ba Srov","lat": "12.107747","lng": "104.858546"}

								]
							}
							,{
								"code": "40202",
								"name": "Kaoh Thkov"
								,"villages": [
									{"code": "VL402020100","name": "Bat Trang","lat": "12.094812","lng": "104.80745"}
,{"code": "VL402020200","name": "Kaoh Lot","lat": "12.090771","lng": "104.796472"}
,{"code": "VL402020300","name": "Kaoh Slaeng","lat": "12.095851","lng": "104.793445"}
,{"code": "VL402020400","name": "Peam Popech","lat": "12.09357","lng": "104.767744"}
,{"code": "VL402020500","name": "Ta Mol Leu","lat": "12.055354","lng": "104.780245"}
,{"code": "VL402020600","name": "Kaoh Thkov","lat": "12.075639","lng": "104.781883"}
,{"code": "VL402020700","name": "Ta Mol Kraom","lat": "12.020925","lng": "104.778656"}
,{"code": "VL402020800","name": "Kor Chrum","lat": "12.111034","lng": "104.806051"}
,{"code": "VL402020900","name": "Dang Tong","lat": "12.013598","lng": "104.787527"}
,{"code": "VL402021000","name": "Peam Chrey","lat": "12.139418","lng": "104.815405"}

								]
							}
							,{
								"code": "40203",
								"name": "Kampong Ous"
								,"villages": [
									{"code": "VL402030100","name": "Kampong Os","lat": "12.217886","lng": "104.728481"}
,{"code": "VL402030200","name": "Kien Ta Ma","lat": "12.204694","lng": "104.75987"}
,{"code": "VL402030300","name": "Thmei","lat": "12.197227","lng": "104.784349"}
,{"code": "VL402030400","name": "Preaek Chhdaor","lat": "12.207831","lng": "104.748367"}
,{"code": "VL402030500","name": "Anlong Ak","lat": "12.176548","lng": "104.787757"}

								]
							}
							,{
								"code": "40204",
								"name": "Peam Chhkaok"
								,"villages": [
									{"code": "VL402040100","name": "Peam Chhkaok","lat": "12.215018","lng": "104.813524"}
,{"code": "VL402040200","name": "Anlong Metrei","lat": "12.229772","lng": "104.807105"}
,{"code": "VL402040300","name": "Phlong","lat": "12.173652","lng": "104.809021"}
,{"code": "VL402040400","name": "Kbal Kanlang","lat": "12.240754","lng": "104.813138"}

								]
							}
							,{
								"code": "40205",
								"name": "Prey Kri"
								,"villages": [
									{"code": "VL402050100","name": "Prey Kri Tboung","lat": "12.152528","lng": "104.875195"}
,{"code": "VL402050200","name": "Kaoh Thum","lat": "12.148408","lng": "104.863129"}
,{"code": "VL402050300","name": "Prey Kri Cheung","lat": "12.177742","lng": "104.87818"}
,{"code": "VL402050400","name": "Chumpear","lat": "12.169884","lng": "104.879801"}
,{"code": "VL402050500","name": "Takann","lat": "12.16606","lng": "104.882156"}

								]
							}
						]
					}
					,{
						"code":  "403"
						,"name":  "Kampong Chhnang"
						,"communes": [
							{
								"code": "40301",
								"name": "Phsar Chhnang"
								,"villages": [
									{"code": "VL403010100","name": "Phsar Leu","lat": "12.261758","lng": "104.674296"}
,{"code": "VL403010200","name": "Phsar Chhnang","lat": "12.265996","lng": "104.678934"}
,{"code": "VL403010300","name": "Chong Kaoh","lat": "12.271426","lng": "104.674872"}
,{"code": "VL403010400","name": "Samraong","lat": "12.257042","lng": "104.67752"}
,{"code": "VL403010500","name": "Kaoh Krabei","lat": "12.259094","lng": "104.669555"}
,{"code": "VL403010600","name": "Trapeang Bei","lat": "12.256629","lng": "104.672739"}
,{"code": "VL403010700","name": "Kampong Os","lat": "12.254607","lng": "104.668356"}
,{"code": "VL403010800","name": "Kandal","lat": "12.267175","lng": "104.681921"}

								]
							}
							,{
								"code": "40302",
								"name": "Kampong Chhnang"
								,"villages": [
									{"code": "VL403020100","name": "Srae Pring","lat": "12.236888","lng": "104.672607"}
,{"code": "VL403020200","name": "Damnak Popul","lat": "12.24178","lng": "104.671976"}
,{"code": "VL403020300","name": "La Tuek Trei","lat": "12.243368","lng": "104.669261"}
,{"code": "VL403020400","name": "Kandal","lat": "12.248941","lng": "104.671388"}
,{"code": "VL403020500","name": "Trapeang Choek Sa","lat": "12.226628","lng": "104.675451"}
,{"code": "VL403020600","name": "Tuol Kralanh","lat": "12.223644","lng": "104.668275"}

								]
							}
							,{
								"code": "40303",
								"name": "B'er"
								,"villages": [
									{"code": "VL403030100","name": "B'er","lat": "12.253701","lng": "104.6593"}
,{"code": "VL403030200","name": "Thommeak Yutt","lat": "12.238995","lng": "104.66512"}
,{"code": "VL403030300","name": "Mong Barang","lat": "12.245471","lng": "104.665829"}
,{"code": "VL403030400","name": "Khleang Prak","lat": "12.250919","lng": "104.661676"}

								]
							}
							,{
								"code": "40304",
								"name": "Khsam"
								,"villages": [
									{"code": "VL403040100","name": "Ti Muoy","lat": "12.25694","lng": "104.66815"}
,{"code": "VL403040200","name": "Ti Pir","lat": "12.258925","lng": "104.657252"}
,{"code": "VL403040300","name": "Ti Bei","lat": "12.259398","lng": "104.658962"}
,{"code": "VL403040400","name": "Ti Buon","lat": "12.265863","lng": "104.651376"}
,{"code": "VL403040500","name": "Ti Pram","lat": "12.264097","lng": "104.656243"}
,{"code": "VL403040600","name": "Ti Prammuoy","lat": "12.262546","lng": "104.660493"}
,{"code": "VL403040700","name": "Ti Prampir","lat": "12.262133","lng": "104.66236"}
,{"code": "VL403040800","name": "Ti Prambei","lat": "12.262029","lng": "104.651786"}

								]
							}
							,{
								"code": "40401",
								"name": "Chranouk"
								,"villages": [
									{"code": "VL404010100","name": "Kangkaeb","lat": "12.411814","lng": "104.789133"}
,{"code": "VL404010200","name": "Thlok","lat": "12.414443","lng": "104.774833"}
,{"code": "VL404010300","name": "Ae Lech","lat": "12.417666","lng": "104.758527"}
,{"code": "VL404010400","name": "Kandal","lat": "12.413299","lng": "104.749901"}

								]
							}
							,{
								"code": "40402",
								"name": "Dar"
								,"villages": [
									{"code": "VL404020100","name": "Dar","lat": "12.354344","lng": "104.799187"}
,{"code": "VL404020200","name": "Thnal","lat": "12.365669","lng": "104.804136"}
,{"code": "VL404020300","name": "Chrolong","lat": "12.390276","lng": "104.805801"}
,{"code": "VL404020400","name": "Prasat","lat": "12.398361","lng": "104.805915"}
,{"code": "VL404020500","name": "Kuy","lat": "12.399687","lng": "104.801691"}

								]
							}
							,{
								"code": "40403",
								"name": "Kampong Hau"
								,"villages": [
									{"code": "VL404030100","name": "Kampong Boeng","lat": "12.276178","lng": "104.728228"}
,{"code": "VL404030200","name": "Kaeng Ta Sok","lat": "12.278837","lng": "104.729007"}
,{"code": "VL404030300","name": "T'uor Rolum","lat": "12.277106","lng": "104.707464"}
,{"code": "VL404030400","name": "Stueng Sandaek","lat": "12.27575","lng": "104.716385"}
,{"code": "VL404030500","name": "Kaoh K'aek","lat": "12.251689","lng": "104.768241"}
,{"code": "VL404030600","name": "Doun Viet","lat": "12.245318","lng": "104.784282"}

								]
							}
							,{
								"code": "40404",
								"name": "Phlov Tuk"
								,"villages": [
									{"code": "VL404040100","name": "Thnal Chheu Teal","lat": "12.514245","lng": "104.618134"}
,{"code": "VL404040200","name": "Peam Khnang","lat": "12.52282","lng": "104.589091"}
,{"code": "VL404040300","name": "Slat","lat": "12.535335","lng": "104.539413"}

								]
							}
						]
					}
					,{
						"code":  "404"
						,"name":  "Kampong Leaeng"
						,"communes": [
							{
								"code": "40301",
								"name": "Phsar Chhnang"
								,"villages": [
									{"code": "VL403010100","name": "Phsar Leu","lat": "12.261758","lng": "104.674296"}
,{"code": "VL403010200","name": "Phsar Chhnang","lat": "12.265996","lng": "104.678934"}
,{"code": "VL403010300","name": "Chong Kaoh","lat": "12.271426","lng": "104.674872"}
,{"code": "VL403010400","name": "Samraong","lat": "12.257042","lng": "104.67752"}
,{"code": "VL403010500","name": "Kaoh Krabei","lat": "12.259094","lng": "104.669555"}
,{"code": "VL403010600","name": "Trapeang Bei","lat": "12.256629","lng": "104.672739"}
,{"code": "VL403010700","name": "Kampong Os","lat": "12.254607","lng": "104.668356"}
,{"code": "VL403010800","name": "Kandal","lat": "12.267175","lng": "104.681921"}

								]
							}
							,{
								"code": "40302",
								"name": "Kampong Chhnang"
								,"villages": [
									{"code": "VL403020100","name": "Srae Pring","lat": "12.236888","lng": "104.672607"}
,{"code": "VL403020200","name": "Damnak Popul","lat": "12.24178","lng": "104.671976"}
,{"code": "VL403020300","name": "La Tuek Trei","lat": "12.243368","lng": "104.669261"}
,{"code": "VL403020400","name": "Kandal","lat": "12.248941","lng": "104.671388"}
,{"code": "VL403020500","name": "Trapeang Choek Sa","lat": "12.226628","lng": "104.675451"}
,{"code": "VL403020600","name": "Tuol Kralanh","lat": "12.223644","lng": "104.668275"}

								]
							}
							,{
								"code": "40303",
								"name": "B'er"
								,"villages": [
									{"code": "VL403030100","name": "B'er","lat": "12.253701","lng": "104.6593"}
,{"code": "VL403030200","name": "Thommeak Yutt","lat": "12.238995","lng": "104.66512"}
,{"code": "VL403030300","name": "Mong Barang","lat": "12.245471","lng": "104.665829"}
,{"code": "VL403030400","name": "Khleang Prak","lat": "12.250919","lng": "104.661676"}

								]
							}
							,{
								"code": "40304",
								"name": "Khsam"
								,"villages": [
									{"code": "VL403040100","name": "Ti Muoy","lat": "12.25694","lng": "104.66815"}
,{"code": "VL403040200","name": "Ti Pir","lat": "12.258925","lng": "104.657252"}
,{"code": "VL403040300","name": "Ti Bei","lat": "12.259398","lng": "104.658962"}
,{"code": "VL403040400","name": "Ti Buon","lat": "12.265863","lng": "104.651376"}
,{"code": "VL403040500","name": "Ti Pram","lat": "12.264097","lng": "104.656243"}
,{"code": "VL403040600","name": "Ti Prammuoy","lat": "12.262546","lng": "104.660493"}
,{"code": "VL403040700","name": "Ti Prampir","lat": "12.262133","lng": "104.66236"}
,{"code": "VL403040800","name": "Ti Prambei","lat": "12.262029","lng": "104.651786"}

								]
							}
							,{
								"code": "40401",
								"name": "Chranouk"
								,"villages": [
									{"code": "VL404010100","name": "Kangkaeb","lat": "12.411814","lng": "104.789133"}
,{"code": "VL404010200","name": "Thlok","lat": "12.414443","lng": "104.774833"}
,{"code": "VL404010300","name": "Ae Lech","lat": "12.417666","lng": "104.758527"}
,{"code": "VL404010400","name": "Kandal","lat": "12.413299","lng": "104.749901"}

								]
							}
							,{
								"code": "40402",
								"name": "Dar"
								,"villages": [
									{"code": "VL404020100","name": "Dar","lat": "12.354344","lng": "104.799187"}
,{"code": "VL404020200","name": "Thnal","lat": "12.365669","lng": "104.804136"}
,{"code": "VL404020300","name": "Chrolong","lat": "12.390276","lng": "104.805801"}
,{"code": "VL404020400","name": "Prasat","lat": "12.398361","lng": "104.805915"}
,{"code": "VL404020500","name": "Kuy","lat": "12.399687","lng": "104.801691"}

								]
							}
							,{
								"code": "40403",
								"name": "Kampong Hau"
								,"villages": [
									{"code": "VL404030100","name": "Kampong Boeng","lat": "12.276178","lng": "104.728228"}
,{"code": "VL404030200","name": "Kaeng Ta Sok","lat": "12.278837","lng": "104.729007"}
,{"code": "VL404030300","name": "T'uor Rolum","lat": "12.277106","lng": "104.707464"}
,{"code": "VL404030400","name": "Stueng Sandaek","lat": "12.27575","lng": "104.716385"}
,{"code": "VL404030500","name": "Kaoh K'aek","lat": "12.251689","lng": "104.768241"}
,{"code": "VL404030600","name": "Doun Viet","lat": "12.245318","lng": "104.784282"}

								]
							}
							,{
								"code": "40404",
								"name": "Phlov Tuk"
								,"villages": [
									{"code": "VL404040100","name": "Thnal Chheu Teal","lat": "12.514245","lng": "104.618134"}
,{"code": "VL404040200","name": "Peam Khnang","lat": "12.52282","lng": "104.589091"}
,{"code": "VL404040300","name": "Slat","lat": "12.535335","lng": "104.539413"}

								]
							}
							,{
								"code": "40405",
								"name": "Pou"
								,"villages": [
									{"code": "VL404050100","name": "Pou","lat": "12.355","lng": "104.723097"}
,{"code": "VL404050200","name": "Samraong","lat": "12.32348","lng": "104.700469"}
,{"code": "VL404050300","name": "Peam Tonlea","lat": "12.355435","lng": "104.724063"}
,{"code": "VL404050400","name": "Thmei","lat": "12.359234","lng": "104.715973"}
,{"code": "VL404050500","name": "Damnak Kakaoh","lat": "12.356404","lng": "104.724779"}
,{"code": "VL404050600","name": "Kampong Ba Chen","lat": "12.345952","lng": "104.700839"}

								]
							}
							,{
								"code": "40406",
								"name": "Pralay Meas"
								,"villages": [
									{"code": "VL404060100","name": "Pralay Meas","lat": "12.386839","lng": "104.630399"}
,{"code": "VL404060200","name": "Krang Phtel","lat": "12.391688","lng": "104.625001"}
,{"code": "VL404060300","name": "Kramal","lat": "12.4474","lng": "104.575693"}
,{"code": "VL404060400","name": "Anlong Kanhchoh","lat": "12.437516","lng": "104.644184"}
,{"code": "VL404060500","name": "Ta Daok","lat": "12.377814","lng": "104.623466"}
,{"code": "VL404060600","name": "Kaoh Ruessei","lat": "12.354515","lng": "104.633857"}

								]
							}
							,{
								"code": "40407",
								"name": "Samraong Saen"
								,"villages": [
									{"code": "VL404070100","name": "Samraong Saen","lat": "12.344987","lng": "104.845046"}
,{"code": "VL404070200","name": "Paprak","lat": "12.341668","lng": "104.845462"}

								]
							}
							,{
								"code": "40408",
								"name": "Svay Rumpear"
								,"villages": [
									{"code": "VL404080100","name": "Chambak Khpos","lat": "12.308668","lng": "104.76569"}
,{"code": "VL404080200","name": "Knong","lat": "12.316122","lng": "104.779746"}
,{"code": "VL404080300","name": "Cheung Kruos","lat": "12.316903","lng": "104.783507"}
,{"code": "VL404080400","name": "Lvea","lat": "12.326475","lng": "104.790066"}
,{"code": "VL404080500","name": "Ta Lat","lat": "12.340352","lng": "104.796815"}

								]
							}
							,{
								"code": "40409",
								"name": "Trangel"
								,"villages": [
									{"code": "VL404090100","name": "Trangel","lat": "12.300189","lng": "104.730365"}
,{"code": "VL404090200","name": "Trabaek","lat": "12.301357","lng": "104.722887"}
,{"code": "VL404090300","name": "Chres","lat": "12.301686","lng": "104.726041"}
,{"code": "VL404090400","name": "Tumnob","lat": "12.297866","lng": "104.750682"}
,{"code": "VL404090500","name": "Trapeang Meas","lat": "12.291681","lng": "104.74185"}
,{"code": "VL404090600","name": "Andoung Ronuk","lat": "12.285947","lng": "104.731327"}
,{"code": "VL404090700","name": "Khlaeng Poar","lat": "12.284571","lng": "104.729829"}

								]
							}
						]
					}
					,{
						"code":  "405"
						,"name":  "Kampong Tralach"
						,"communes": [
							{
								"code": "40501",
								"name": "Ampil Tuek"
								,"villages": [
									{"code": "VL405010100","name": "Stueng Snguot","lat": "11.978527","lng": "104.839902"}
,{"code": "VL405010200","name": "Kien Khleang","lat": "11.889377","lng": "104.78475"}
,{"code": "VL405010300","name": "Veal Sbov","lat": "11.894556","lng": "104.805581"}
,{"code": "VL405010400","name": "K'aek Pong","lat": "11.995394","lng": "104.811967"}
,{"code": "VL405010500","name": "Ampil Tuek","lat": "11.990469","lng": "104.833208"}
,{"code": "VL405010600","name": "Baek Chan","lat": "11.968041","lng": "104.831357"}
,{"code": "VL405010700","name": "Ou Mal","lat": "11.958721","lng": "104.837223"}
,{"code": "VL405010800","name": "Bak Phnum","lat": "11.901807","lng": "104.815402"}
,{"code": "VL405010900","name": "Kbal Kaoh","lat": "11.986366","lng": "104.796376"}
,{"code": "VL405011000","name": "Khla Krohuem","lat": "11.936429","lng": "104.822946"}
,{"code": "VL405011100","name": "Sdei Banlich","lat": "12.006039","lng": "104.801129"}

								]
							}
							,{
								"code": "40502",
								"name": "Chhuk Sa"
								,"villages": [
									{"code": "VL405020100","name": "Andoung Tramung","lat": "12.010487","lng": "104.64491"}
,{"code": "VL405020200","name": "Chrak Romiet","lat": "11.95887","lng": "104.717592"}
,{"code": "VL405020300","name": "Srae Pis","lat": "11.977411","lng": "104.719841"}
,{"code": "VL405020400","name": "Prey Pear","lat": "12.009322","lng": "104.700122"}
,{"code": "VL405020500","name": "Sna Pechr","lat": "12.003735","lng": "104.693615"}
,{"code": "VL405020600","name": "Chhuk Kranhas","lat": "12.020474","lng": "104.685043"}
,{"code": "VL405020700","name": "Krasah Thmei","lat": "12.007318","lng": "104.721317"}
,{"code": "VL405020800","name": "Trapeang Chrov","lat": "12.020526","lng": "104.660101"}
,{"code": "VL405020900","name": "Trapeang Khtum","lat": "12.007865","lng": "104.667429"}
,{"code": "VL405021000","name": "Tuol","lat": "12.006658","lng": "104.68719"}
,{"code": "VL405021100","name": "Ou Rung","lat": "11.989866","lng": "104.722878"}
,{"code": "VL405021200","name": "Sdok Lech","lat": "12.012579","lng": "104.710315"}
,{"code": "VL405021300","name": "Srae Sar","lat": "12.052905","lng": "104.635437"}
,{"code": "VL405021400","name": "Chrolong Kaisna","lat": "12.044544","lng": "104.659612"}

								]
							}
							,{
								"code": "40503",
								"name": "Chres"
								,"villages": [
									{"code": "VL405030100","name": "Trapeang Pnov","lat": "11.939113","lng": "104.759684"}
,{"code": "VL405030200","name": "Serei Chhaom","lat": "11.970222","lng": "104.748754"}
,{"code": "VL405030300","name": "Veal Lvieng","lat": "11.963731","lng": "104.761894"}
,{"code": "VL405030400","name": "Ou","lat": "11.968895","lng": "104.762037"}
,{"code": "VL405030500","name": "Chumteav Sokh","lat": "11.9744","lng": "104.759607"}
,{"code": "VL405030600","name": "Saray Andaet","lat": "11.979766","lng": "104.752346"}
,{"code": "VL405030700","name": "Kanhchoung","lat": "11.977104","lng": "104.739112"}
,{"code": "VL405030800","name": "Prey Pis","lat": "11.97047","lng": "104.723926"}
,{"code": "VL405030900","name": "Kbal Damrei","lat": "11.944131","lng": "104.757512"}
,{"code": "VL405031000","name": "Prab Phcheah","lat": "11.941157","lng": "104.749313"}
,{"code": "VL405031100","name": "Chramoh Chruk","lat": "11.952051","lng": "104.755466"}
,{"code": "VL405031200","name": "Chak","lat": "11.952177","lng": "104.765266"}
,{"code": "VL405031300","name": "Dak Snet","lat": "11.957607","lng": "104.760017"}
,{"code": "VL405031400","name": "Chumteav","lat": "11.955917","lng": "104.75042"}

								]
							}
							,{
								"code": "40504",
								"name": "Kampong Tralach"
								,"villages": [
									{"code": "VL405040100","name": "Kampong Tralach Leu","lat": "11.930334","lng": "104.762171"}
,{"code": "VL405040200","name": "Kampong Tralach Kraom","lat": "11.915493","lng": "104.782929"}
,{"code": "VL405040300","name": "Neak Ta Hang","lat": "11.92051","lng": "104.757781"}
,{"code": "VL405040400","name": "Samretthi Chey","lat": "11.910326","lng": "104.778443"}
,{"code": "VL405040500","name": "Preaek Kanlang","lat": "11.915764","lng": "104.794114"}
,{"code": "VL405040600","name": "Kampong Kdar","lat": "11.948717","lng": "104.792978"}
,{"code": "VL405040700","name": "Kien Roka","lat": "11.947854","lng": "104.79984"}

								]
							}
							,{
								"code": "40505",
								"name": "Longveaek"
								,"villages": [
									{"code": "VL405050100","name": "Oknha Pang","lat": "11.866578","lng": "104.730706"}
,{"code": "VL405050200","name": "Trapeang Chambak","lat": "11.863167","lng": "104.748099"}
,{"code": "VL405050300","name": "Phsar Trach","lat": "11.849263","lng": "104.72392"}
,{"code": "VL405050400","name": "Anlong Tnaot","lat": "11.89412","lng": "104.7082"}
,{"code": "VL405050500","name": "Srah Chak","lat": "11.871373","lng": "104.752233"}
,{"code": "VL405050600","name": "Voat","lat": "11.862452","lng": "104.758549"}
,{"code": "VL405050700","name": "Trapeang Samraong","lat": "11.849062","lng": "104.731568"}
,{"code": "VL405050800","name": "Boeng Kak","lat": "11.900605","lng": "104.727505"}

								]
							}
							,{
								"code": "40506",
								"name": "Ou Ruessei"
								,"villages": [
									{"code": "VL405060100","name": "Chrak Romiet","lat": "11.947466","lng": "104.717052"}
,{"code": "VL405060200","name": "Sala Lekh Pram","lat": "11.936915","lng": "104.719341"}
,{"code": "VL405060300","name": "Ou Ruessei","lat": "11.937452","lng": "104.723372"}
,{"code": "VL405060400","name": "Srae Prei","lat": "11.929524","lng": "104.735916"}
,{"code": "VL405060500","name": "Chan Kiek","lat": "11.922688","lng": "104.7364"}
,{"code": "VL405060600","name": "Kralanh","lat": "11.924665","lng": "104.723752"}
,{"code": "VL405060700","name": "Khnong","lat": "11.924108","lng": "104.718289"}
,{"code": "VL405060800","name": "Leach","lat": "11.914582","lng": "104.714111"}

								]
							}
							,{
								"code": "40507",
								"name": "Peani"
								,"villages": [
									{"code": "VL405070100","name": "Ta Ak","lat": "11.939499","lng": "104.708878"}
,{"code": "VL405070200","name": "Soben","lat": "11.932111","lng": "104.708931"}
,{"code": "VL405070300","name": "Ta Kol","lat": "11.922105","lng": "104.704672"}
,{"code": "VL405070400","name": "Stueng","lat": "11.922646","lng": "104.703064"}
,{"code": "VL405070500","name": "Prey Sak","lat": "11.936463","lng": "104.693388"}
,{"code": "VL405070600","name": "Peani","lat": "11.940921","lng": "104.685677"}
,{"code": "VL405070700","name": "Kok","lat": "11.949627","lng": "104.667601"}
,{"code": "VL405070800","name": "Tuol Serei","lat": "11.940415","lng": "104.677963"}
,{"code": "VL405070900","name": "Krang Ta Aek","lat": "11.924106","lng": "104.690692"}

								]
							}
							,{
								"code": "40508",
								"name": "Saeb"
								,"villages": [
									{"code": "VL405080100","name": "Khnay Kakaoh","lat": "12.053091","lng": "104.726185"}
,{"code": "VL405080200","name": "Tuek L'ak","lat": "12.06598","lng": "104.720126"}
,{"code": "VL405080300","name": "Kbal Thnal","lat": "12.058963","lng": "104.729432"}
,{"code": "VL405080400","name": "Ta Sokh","lat": "12.068173","lng": "104.753432"}
,{"code": "VL405080500","name": "Ta Sou","lat": "12.061817","lng": "104.744746"}
,{"code": "VL405080600","name": "Doun Toy","lat": "12.068638","lng": "104.747128"}
,{"code": "VL405080700","name": "Ta Nob","lat": "12.060488","lng": "104.755369"}
,{"code": "VL405080800","name": "Chambak Ph'aem","lat": "12.065816","lng": "104.756411"}
,{"code": "VL405080900","name": "Kralanh","lat": "12.060944","lng": "104.749083"}
,{"code": "VL405081000","name": "Kampong Prasat","lat": "12.066616","lng": "104.772435"}
,{"code": "VL405081100","name": "Pravoek Pong","lat": "12.054307","lng": "104.703802"}
,{"code": "VL405081200","name": "Khnay Kakaoh Thmei","lat": "12.047409","lng": "104.681475"}

								]
							}
							,{
								"code": "40509",
								"name": "Ta Ches"
								,"villages": [
									{"code": "VL405090100","name": "Boeng Kak","lat": "12.017083","lng": "104.710365"}
,{"code": "VL405090200","name": "La Peang","lat": "12.024734","lng": "104.72004"}
,{"code": "VL405090300","name": "Ou Rung","lat": "11.988305","lng": "104.734986"}
,{"code": "VL405090400","name": "Samraong","lat": "12.017391","lng": "104.729565"}
,{"code": "VL405090500","name": "Svay Kraom","lat": "12.007643","lng": "104.729557"}
,{"code": "VL405090600","name": "Souvong","lat": "12.026212","lng": "104.733121"}
,{"code": "VL405090700","name": "Snay","lat": "12.011946","lng": "104.737857"}
,{"code": "VL405090800","name": "Svay Bakav","lat": "12.003998","lng": "104.748025"}
,{"code": "VL405090900","name": "Voat Thmei","lat": "12.042284","lng": "104.755697"}
,{"code": "VL405091000","name": "Thlok Yol","lat": "12.03771","lng": "104.746854"}
,{"code": "VL405091100","name": "Ta Kaoh","lat": "12.038379","lng": "104.747111"}
,{"code": "VL405091200","name": "Trapeang Preal","lat": "12.05073","lng": "104.754881"}
,{"code": "VL405091300","name": "Banteay Meas","lat": "12.051638","lng": "104.739013"}
,{"code": "VL405091400","name": "Sampoar","lat": "12.017023","lng": "104.762096"}
,{"code": "VL405091500","name": "Kampong Ta Ches","lat": "12.013795","lng": "104.77383"}

								]
							}
							,{
								"code": "40510",
								"name": "Thma Edth"
								,"villages": [
									{"code": "VL405100100","name": "Daeum Popel","lat": "11.951002","lng": "104.691259"}
,{"code": "VL405100200","name": "Snang Mom","lat": "11.957905","lng": "104.678356"}
,{"code": "VL405100300","name": "Thma Edth","lat": "11.966248","lng": "104.667397"}
,{"code": "VL405100400","name": "Ko","lat": "11.97093","lng": "104.657325"}
,{"code": "VL405100500","name": "Trapeang Kdar","lat": "11.986359","lng": "104.637318"}

								]
							}
						]
					}
					,{
						"code":  "406"
						,"name":  "Rolea B'ier"
						,"communes": [
							{
								"code": "40601",
								"name": "Andoung Snay"
								,"villages": [
									{"code": "VL406010100","name": "Spok Reach","lat": "12.174236","lng": "104.663823"}
,{"code": "VL406010200","name": "Andoung Snay","lat": "12.171653","lng": "104.666014"}
,{"code": "VL406010300","name": "Andoung Chrey","lat": "12.156251","lng": "104.672807"}
,{"code": "VL406010400","name": "Char Thmei","lat": "12.140652","lng": "104.680611"}
,{"code": "VL406010500","name": "Tbaeng","lat": "12.13119","lng": "104.710399"}
,{"code": "VL406010600","name": "Pahi","lat": "12.133557","lng": "104.717611"}
,{"code": "VL406010700","name": "Bampong Phchoek","lat": "12.154147","lng": "104.707185"}

								]
							}
							,{
								"code": "40602",
								"name": "Banteay Preal"
								,"villages": [
									{"code": "VL406020100","name": "Preal","lat": "12.284979","lng": "104.562667"}
,{"code": "VL406020200","name": "Thma Reab","lat": "12.25822","lng": "104.534392"}
,{"code": "VL406020300","name": "Phlov Kou","lat": "12.253056","lng": "104.550859"}
,{"code": "VL406020400","name": "Toap Srov","lat": "12.27219","lng": "104.523195"}
,{"code": "VL406020500","name": "Toap Tbaeng","lat": "12.29861","lng": "104.565008"}
,{"code": "VL406020600","name": "Chheu Neak","lat": "12.309702","lng": "104.568319"}
,{"code": "VL406020700","name": "Sdok Kabbas","lat": "12.305993","lng": "104.545334"}
,{"code": "VL406020800","name": "Trapeang Phkoam","lat": "12.266227","lng": "104.531527"}
,{"code": "VL406020900","name": "Ou Leach","lat": "12.278065","lng": "104.548582"}
,{"code": "VL406021000","name": "Ruessei Duoch","lat": "12.264951","lng": "104.541717"}

								]
							}
							,{
								"code": "40603",
								"name": "Cheung Kreav"
								,"villages": [
									{"code": "VL406030100","name": "Ta Lou","lat": "12.126932","lng": "104.615017"}
,{"code": "VL406030200","name": "Trapeang Popel","lat": "12.098682","lng": "104.642736"}
,{"code": "VL406030300","name": "Pring Kaong","lat": "12.132234","lng": "104.617298"}
,{"code": "VL406030400","name": "Luong","lat": "12.133731","lng": "104.620531"}
,{"code": "VL406030500","name": "Andoung Chek","lat": "12.134597","lng": "104.626035"}
,{"code": "VL406030600","name": "Tuek Chenh","lat": "12.135137","lng": "104.630501"}
,{"code": "VL406030700","name": "Souphi","lat": "12.094348","lng": "104.640536"}
,{"code": "VL406030800","name": "Tang Bampong","lat": "12.143064","lng": "104.628082"}
,{"code": "VL406030900","name": "Damnak Kei","lat": "12.092132","lng": "104.647799"}
,{"code": "VL406031000","name": "Khnach Kakaoh","lat": "12.068611","lng": "104.662604"}
,{"code": "VL406031100","name": "Ou Loy","lat": "12.068822","lng": "104.650135"}

								]
							}
							,{
								"code": "40604",
								"name": "Chrey Bak"
								,"villages": [
									{"code": "VL406040100","name": "Tuol Khsach","lat": "12.215768","lng": "104.668689"}
,{"code": "VL406040200","name": "Prey Kaoh","lat": "12.212258","lng": "104.667765"}
,{"code": "VL406040300","name": "Prey Puoch","lat": "12.207772","lng": "104.666879"}
,{"code": "VL406040400","name": "Thmei","lat": "12.203619","lng": "104.665643"}
,{"code": "VL406040500","name": "Thnal Thmei","lat": "12.199156","lng": "104.661466"}
,{"code": "VL406040600","name": "Chrey Bak","lat": "12.193268","lng": "104.660728"}
,{"code": "VL406040700","name": "Ou Kamnab","lat": "12.195202","lng": "104.645246"}
,{"code": "VL406040800","name": "Ou Kandaol","lat": "12.201278","lng": "104.651884"}
,{"code": "VL406040900","name": "Prey Leak Neang","lat": "12.197485","lng": "104.641529"}
,{"code": "VL406041000","name": "Banh Chhkoul","lat": "12.183957","lng": "104.648698"}
,{"code": "VL406041100","name": "Trapeang An","lat": "12.187838","lng": "104.643067"}
,{"code": "VL406041200","name": "Khley","lat": "12.181236","lng": "104.635814"}
,{"code": "VL406041300","name": "Alaeng","lat": "12.171919","lng": "104.620026"}
,{"code": "VL406041400","name": "Trapeang Kor","lat": "12.185678","lng": "104.616762"}
,{"code": "VL406041500","name": "Preah Ream Reangsei","lat": "12.182128","lng": "104.600432"}
,{"code": "VL406041600","name": "Ou Roung","lat": "12.197779","lng": "104.618179"}

								]
							}
							,{
								"code": "40605",
								"name": "Kouk Banteay"
								,"villages": [
									{"code": "VL406050100","name": "Kouk Banteay","lat": "12.185941","lng": "104.681742"}
,{"code": "VL406050200","name": "Popel Pok","lat": "12.187106","lng": "104.688075"}
,{"code": "VL406050300","name": "Mean Chey","lat": "12.179702","lng": "104.68254"}
,{"code": "VL406050400","name": "Troneam Pech","lat": "12.177026","lng": "104.675126"}
,{"code": "VL406050500","name": "Ou Ta Sek","lat": "12.167942","lng": "104.694963"}
,{"code": "VL406050600","name": "Chheu Trach","lat": "12.156144","lng": "104.705997"}
,{"code": "VL406050700","name": "Kang Meas","lat": "12.164934","lng": "104.77294"}
,{"code": "VL406050800","name": "Kanlaeng Phe","lat": "12.150509","lng": "104.794671"}

								]
							}
							,{
								"code": "40606",
								"name": "Krang Leav"
								,"villages": [
									{"code": "VL406060100","name": "Krang Leav","lat": "12.225924","lng": "104.55426"}
,{"code": "VL406060200","name": "Thmei","lat": "12.221012","lng": "104.558672"}
,{"code": "VL406060300","name": "Tuek L'ak","lat": "12.215184","lng": "104.573171"}
,{"code": "VL406060400","name": "Pat Lang Choeung","lat": "12.214792","lng": "104.559363"}
,{"code": "VL406060500","name": "Boeng Veaeng","lat": "12.219832","lng": "104.550097"}
,{"code": "VL406060600","name": "Srae Veal","lat": "12.207301","lng": "104.546137"}
,{"code": "VL406060700","name": "Chrolong Kak","lat": "12.187737","lng": "104.532998"}
,{"code": "VL406060800","name": "Andoung Preng","lat": "12.179716","lng": "104.533003"}
,{"code": "VL406060900","name": "Pat Lang Koeut","lat": "12.231676","lng": "104.58905"}
,{"code": "VL406061000","name": "Pat Lang Tboung","lat": "12.195623","lng": "104.578543"}

								]
							}
							,{
								"code": "40607",
								"name": "Pongro"
								,"villages": [
									{"code": "VL406070100","name": "Trapeang Pou","lat": "12.266191","lng": "104.619634"}
,{"code": "VL406070200","name": "Khvet","lat": "12.262674","lng": "104.600909"}
,{"code": "VL406070300","name": "Srang Khpos","lat": "12.259229","lng": "104.59457"}
,{"code": "VL406070400","name": "Phnum Touch","lat": "12.250629","lng": "104.59451"}
,{"code": "VL406070500","name": "Santey","lat": "12.251752","lng": "104.583529"}
,{"code": "VL406070600","name": "Dak Krong","lat": "12.259392","lng": "104.577302"}
,{"code": "VL406070700","name": "Andoung Pou","lat": "12.264436","lng": "104.587804"}
,{"code": "VL406070800","name": "Thmei","lat": "12.274079","lng": "104.589876"}
,{"code": "VL406070900","name": "Prambei Chhaom","lat": "12.274253","lng": "104.585379"}
,{"code": "VL406071000","name": "Trapeang Thum","lat": "12.267033","lng": "104.577198"}
,{"code": "VL406071100","name": "Thma Reab","lat": "12.274623","lng": "104.572882"}
,{"code": "VL406071200","name": "Toap Tbaeng","lat": "12.287923","lng": "104.583601"}

								]
							}
							,{
								"code": "40608",
								"name": "Prasneb"
								,"villages": [
									{"code": "VL406080100","name": "Prey Sampov","lat": "12.26393","lng": "104.486007"}
,{"code": "VL406080200","name": "Chonleav","lat": "12.258769","lng": "104.487571"}
,{"code": "VL406080300","name": "S'ang","lat": "12.29059","lng": "104.506674"}
,{"code": "VL406080400","name": "Srangam Ter","lat": "12.315685","lng": "104.522942"}
,{"code": "VL406080500","name": "Trapeang Ampil","lat": "12.347277","lng": "104.500663"}
,{"code": "VL406080600","name": "Prasneb","lat": "12.313512","lng": "104.435762"}
,{"code": "VL406080700","name": "Chor","lat": "12.276956","lng": "104.411987"}

								]
							}
							,{
								"code": "40609",
								"name": "Prey Mul"
								,"villages": [
									{"code": "VL406090700","name": "Khlaeng Poar","lat": "12.15418","lng": "104.517799"}

								]
							}
							,{
								"code": "40610",
								"name": "Rolea B'ier"
								,"villages": [
									{"code": "VL406100100","name": "Kruos","lat": "12.154231","lng": "104.633618"}
,{"code": "VL406100200","name": "Prey Khmaer","lat": "12.167677","lng": "104.661248"}
,{"code": "VL406100300","name": "Andoung Chroh","lat": "12.158599","lng": "104.655349"}
,{"code": "VL406100400","name": "Chea Rov","lat": "12.153557","lng": "104.650926"}
,{"code": "VL406100500","name": "Trapeang Trach","lat": "12.140768","lng": "104.642101"}
,{"code": "VL406100600","name": "Ou Ta Nes","lat": "12.125376","lng": "104.686768"}

								]
							}
							,{
								"code": "40611",
								"name": "Srae Thmei"
								,"villages": [
									{"code": "VL406110100","name": "Kdei Tnaot","lat": "12.253776","lng": "104.654105"}
,{"code": "VL406110200","name": "Chamkar Ta Mau","lat": "12.246544","lng": "104.655953"}
,{"code": "VL406110300","name": "Santuch","lat": "12.235684","lng": "104.649531"}
,{"code": "VL406110400","name": "Traok Kaeut","lat": "12.227533","lng": "104.640348"}
,{"code": "VL406110500","name": "Traok Kandal","lat": "12.223258","lng": "104.635288"}
,{"code": "VL406110600","name": "Traok Lech","lat": "12.224814","lng": "104.635755"}
,{"code": "VL406110700","name": "Kol Kob","lat": "12.214861","lng": "104.631172"}
,{"code": "VL406110800","name": "Trapeang Sbov","lat": "12.238117","lng": "104.629126"}
,{"code": "VL406110900","name": "Prey Moan","lat": "12.239013","lng": "104.643459"}
,{"code": "VL406111000","name": "Andoung Ruessei","lat": "12.246504","lng": "104.625611"}
,{"code": "VL406111100","name": "Trea Tboung","lat": "12.251248","lng": "104.643038"}
,{"code": "VL406111200","name": "Trea Cheung","lat": "12.255149","lng": "104.645956"}

								]
							}
							,{
								"code": "40612",
								"name": "Svay Chrum"
								,"villages": [
									{"code": "VL406120100","name": "Thma Kaev","lat": "12.312311","lng": "104.571331"}
,{"code": "VL406120200","name": "Knong","lat": "12.299716","lng": "104.578028"}
,{"code": "VL406120300","name": "Krang Prasvay","lat": "12.288522","lng": "104.590939"}
,{"code": "VL406120400","name": "Utumpor","lat": "12.295206","lng": "104.59789"}
,{"code": "VL406120500","name": "Selang","lat": "12.290983","lng": "104.610081"}
,{"code": "VL406120600","name": "Svay Chrum Thmei","lat": "12.281768","lng": "104.591179"}
,{"code": "VL406120700","name": "Chamkar Khley","lat": "12.275807","lng": "104.596457"}
,{"code": "VL406120800","name": "Chen","lat": "12.271883","lng": "104.602734"}
,{"code": "VL406120900","name": "Phlov Veay","lat": "12.268748","lng": "104.611162"}
,{"code": "VL406121000","name": "Ou Totueng","lat": "12.280811","lng": "104.611512"}
,{"code": "VL406121100","name": "Tuol Trea","lat": "12.278622","lng": "104.617483"}
,{"code": "VL406121200","name": "Svay Chrum Chas","lat": "12.288184","lng": "104.613166"}
,{"code": "VL406121300","name": "Smaet","lat": "12.27083","lng": "104.625743"}
,{"code": "VL406121400","name": "Thnong Kambot","lat": "12.274802","lng": "104.627732"}
,{"code": "VL406121500","name": "Chanlaoh Ren","lat": "12.280189","lng": "104.625242"}
,{"code": "VL406121600","name": "Dambouk Kakaoh","lat": "12.271715","lng": "104.631553"}
,{"code": "VL406121700","name": "Trapeang Anhchanh","lat": "12.267581","lng": "104.644579"}
,{"code": "VL406121800","name": "Thnal Ta Saeng","lat": "12.311217","lng": "104.647068"}
,{"code": "VL406121900","name": "Kaoh Kaev","lat": "12.332122","lng": "104.612274"}
,{"code": "VL406122000","name": "Krapeu Pul","lat": "12.337262","lng": "104.648312"}
,{"code": "VL406122100","name": "Svay Chek","lat": "12.296479","lng": "104.596647"}
,{"code": "VL406122200","name": "Kampong Reang","lat": "12.358481","lng": "104.592872"}

								]
							}
							,{
								"code": "40613",
								"name": "Tuek Hout"
								,"villages": [
									{"code": "VL406130100","name": "Ou Sandan","lat": "12.116821","lng": "104.694801"}
,{"code": "VL406130200","name": "Tuek Hout","lat": "12.112971","lng": "104.732208"}
,{"code": "VL406130300","name": "Preaek Sala","lat": "12.12346","lng": "104.760587"}
,{"code": "VL406130400","name": "Noneam Totueng","lat": "12.097407","lng": "104.730487"}
,{"code": "VL406130500","name": "Preaek Reang","lat": "12.110524","lng": "104.745306"}
,{"code": "VL406130600","name": "Kouk Sdau","lat": "12.089664","lng": "104.737818"}
,{"code": "VL406130700","name": "Trapeang Krapeu","lat": "12.109128","lng": "104.713474"}
,{"code": "VL406130800","name": "Tuek L'ak","lat": "12.076911","lng": "104.717377"}
,{"code": "VL406130900","name": "Ou Sandan Thmei","lat": "12.110989","lng": "104.686831"}

								]
							}
						]
					}
					,{
						"code":  "407"
						,"name":  "Sameakki Mean Chey"
						,"communes": [
							{
								"code": "40701",
								"name": "Chhean Laeung"
								,"villages": [
									{"code": "VL407010100","name": "Chrak Tnaot","lat": "11.750923","lng": "104.477002"}
,{"code": "VL407010200","name": "Traeng","lat": "11.768545","lng": "104.470324"}
,{"code": "VL407010300","name": "Royeas","lat": "11.792335","lng": "104.445284"}
,{"code": "VL407010302","name": "Andong Préng","lat": "11.792403","lng": "104.444784"}
,{"code": "VL407010303","name": "O Dar","lat": "","lng": ""}
,{"code": "VL407010400","name": "Trapeang Thma","lat": "11.76807","lng": "104.482761"}
,{"code": "VL407010500","name": "Srae Ruessei","lat": "11.775865","lng": "104.49231"}
,{"code": "VL407010600","name": "Krang Samraong","lat": "11.742001","lng": "104.494006"}
,{"code": "VL407010700","name": "Anlong Pring","lat": "11.755622","lng": "104.460813"}
,{"code": "VL407010800","name": "Chuonh Chit","lat": "11.770583","lng": "104.434314"}
,{"code": "VL407010900","name": "Veal Chloy","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "40702",
								"name": "Khnar Chhmar"
								,"villages": [
									{"code": "VL407020100","name": "Voat","lat": "11.977197","lng": "104.609039"}
,{"code": "VL407020200","name": "Trapeang Srangae","lat": "11.990564","lng": "104.603343"}
,{"code": "VL407020300","name": "Chrey Kaong Lech","lat": "11.999344","lng": "104.603358"}
,{"code": "VL407020301","name": "Veal Angkrorng","lat": "","lng": ""}
,{"code": "VL407020400","name": "Chrey Kaong Kaeut","lat": "12.002161","lng": "104.606624"}
,{"code": "VL407020500","name": "Thma Sa","lat": "11.997903","lng": "104.633564"}
,{"code": "VL407020600","name": "Khnar Kandal","lat": "12.001808","lng": "104.612173"}
,{"code": "VL407020700","name": "Tradak Pong","lat": "12.003384","lng": "104.621063"}

								]
							}
							,{
								"code": "40703",
								"name": "Krang Lvea"
								,"villages": [
									{"code": "VL407030100","name": "Thnal","lat": "11.969064","lng": "104.581928"}
,{"code": "VL407030200","name": "Krang Lvea","lat": "11.966049","lng": "104.579765"}
,{"code": "VL407030300","name": "Ou Kakhob","lat": "11.964488","lng": "104.569728"}
,{"code": "VL407030301","name": "Tramoung Chrum","lat": "11.911728","lng": "104.557952"}
,{"code": "VL407030302","name": "Tuek Chub","lat": "","lng": ""}
,{"code": "VL407030400","name": "Chres","lat": "11.964779","lng": "104.553251"}
,{"code": "VL407030401","name": "Sdok Tronik","lat": "11.968971","lng": "104.437005"}
,{"code": "VL407030500","name": "KhnaTey Mouk","lat": "11.994237","lng": "104.574201"}
,{"code": "VL407030600","name": "Tang Krong","lat": "11.964494","lng": "104.598394"}
,{"code": "VL407030700","name": "Thlok Roleung","lat": "11.973414","lng": "104.55816"}
,{"code": "VL407030800","name": "Chumteav Chraeng","lat": "11.968087","lng": "104.56378"}
,{"code": "VL407030801","name": "Krang Thnot","lat": "","lng": ""}
,{"code": "VL407030802","name": "Sambok Kriel","lat": "","lng": ""}
,{"code": "VL407030900","name": "Tang Kruos Lech","lat": "11.964158","lng": "104.522464"}
,{"code": "VL407031000","name": "Tang Kruos Kaeut","lat": "11.966524","lng": "104.536283"}
,{"code": "VL407031001","name": "Ach Sat","lat": "","lng": ""}
,{"code": "VL407031002","name": "Thma Dêk Phleung","lat": "11.965006","lng": "104.443874"}
,{"code": "VL407031100","name": "Ksach Sor","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "40704",
								"name": "Peam"
								,"villages": [
									{"code": "VL407040100","name": "Tang Poun","lat": "11.744849","lng": "104.547266"}
,{"code": "VL407040200","name": "Krang Doung","lat": "11.744731","lng": "104.536052"}
,{"code": "VL407040300","name": "Chanva Riel","lat": "11.744815","lng": "104.526489"}
,{"code": "VL407040400","name": "Srae Andoung","lat": "11.741693","lng": "104.514499"}
,{"code": "VL407040500","name": "Ta Kaev","lat": "11.744188","lng": "104.503657"}
,{"code": "VL407040600","name": "Krang Beng","lat": "11.756702","lng": "104.551845"}
,{"code": "VL407040700","name": "Svay Kambet","lat": "11.76269","lng": "104.552285"}
,{"code": "VL407040800","name": "Chrab Kantuot","lat": "11.781673","lng": "104.536228"}
,{"code": "VL407040900","name": "Krang Kantoul","lat": "11.79643","lng": "104.529732"}
,{"code": "VL407041000","name": "Chrak Sdach","lat": "11.798672","lng": "104.51361"}
,{"code": "VL407041100","name": "Chrak Kov","lat": "11.800794","lng": "104.511734"}
,{"code": "VL407041200","name": "Serei Vong","lat": "11.790846","lng": "104.511228"}
,{"code": "VL407041300","name": "Sor senchety","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "40705",
								"name": "Sedthei"
								,"villages": [
									{"code": "VL407050100","name": "Chamkar Svay","lat": "11.874138","lng": "104.712087"}
,{"code": "VL407050200","name": "Spean Pou","lat": "11.898554","lng": "104.702778"}
,{"code": "VL407050300","name": "Thlok Ruessei","lat": "11.896361","lng": "104.697969"}
,{"code": "VL407050400","name": "Boeng Leach","lat": "11.89736","lng": "104.677628"}
,{"code": "VL407050500","name": "Khnach","lat": "11.896906","lng": "104.631936"}
,{"code": "VL407050600","name": "Krang Siem","lat": "11.901906","lng": "104.652416"}
,{"code": "VL407050700","name": "Angkrong","lat": "11.880685","lng": "104.670431"}
,{"code": "VL407050800","name": "Voat Sedthei","lat": "11.872512","lng": "104.671873"}
,{"code": "VL407050900","name": "Peareach","lat": "11.87925","lng": "104.650324"}

								]
							}
							,{
								"code": "40706",
								"name": "Svay"
								,"villages": [
									{"code": "VL407060100","name": "Trapeang Buon","lat": "11.815121","lng": "104.662614"}
,{"code": "VL407060200","name": "Chamkar","lat": "11.818024","lng": "104.670221"}
,{"code": "VL407060400","name": "Trapeang Thma","lat": "11.816173","lng": "104.680395"}
,{"code": "VL407060500","name": "Tuol Pongro","lat": "11.821208","lng": "104.686732"}
,{"code": "VL407060600","name": "Svay Pok","lat": "11.816559","lng": "104.695009"}
,{"code": "VL407060700","name": "Kyang Tboung","lat": "11.825226","lng": "104.706428"}
,{"code": "VL407060800","name": "Khyang Cheung","lat": "11.826392","lng": "104.706363"}
,{"code": "VL407060900","name": "Krasang Pul","lat": "11.832474","lng": "104.711121"}
,{"code": "VL407061000","name": "Pou Ritthi Krai","lat": "11.836276","lng": "104.714431"}
,{"code": "VL407061100","name": "Thmei","lat": "11.847341","lng": "104.710114"}
,{"code": "VL407061200","name": "Chonloat Dai","lat": "11.849484","lng": "104.719651"}
,{"code": "VL407061300","name": "Svay Ph'aem","lat": "11.845253","lng": "104.711824"}

								]
							}
							,{
								"code": "40707",
								"name": "Svay Chuk"
								,"villages": [
									{"code": "VL407070100","name": "Kngaok Pong","lat": "11.815246","lng": "104.611896"}
,{"code": "VL407070200","name": "Trapeang Pring","lat": "11.80482","lng": "104.599454"}
,{"code": "VL407070300","name": "Damnak Pring","lat": "11.802915","lng": "104.594977"}
,{"code": "VL407070400","name": "Trapeang Mtes","lat": "11.798405","lng": "104.590835"}
,{"code": "VL407070500","name": "Tang Krang","lat": "11.779932","lng": "104.57971"}
,{"code": "VL407070600","name": "Krang Srama","lat": "11.776532","lng": "104.568224"}
,{"code": "VL407070700","name": "Trapeang Tumloab","lat": "11.771811","lng": "104.562109"}
,{"code": "VL407070800","name": "Prey Nheam","lat": "11.780826","lng": "104.549236"}
,{"code": "VL407070801","name": "Tuek S oy","lat": "11.846097","lng": "104.490745"}
,{"code": "VL407070900","name": "Tang Khley","lat": "11.799363","lng": "104.554557"}
,{"code": "VL407071000","name": "Chrak Sangkae","lat": "11.814473","lng": "104.553578"}
,{"code": "VL407071101","name": "Thma Keo","lat": "","lng": ""}

								]
							}
							,{
								"code": "40708",
								"name": "Tbaeng Khpos"
								,"villages": [
									{"code": "VL407080700","name": "Meanok Lech","lat": "11.877807","lng": "104.605408"}

								]
							}
							,{
								"code": "40709",
								"name": "Thlok Vien"
								,"villages": [
									{"code": "VL407090100","name": "Thlok Vien","lat": "11.947543","lng": "104.621637"}
,{"code": "VL407090200","name": "Srae Krau","lat": "11.954988","lng": "104.629681"}
,{"code": "VL407090300","name": "Tang Tbaeng","lat": "11.956307","lng": "104.635824"}
,{"code": "VL407090400","name": "Chhuk","lat": "11.953329","lng": "104.647694"}
,{"code": "VL407090500","name": "Spean Daek","lat": "11.952398","lng": "104.655723"}
,{"code": "VL407090600","name": "Toap Baoh","lat": "11.958644","lng": "104.611564"}
,{"code": "VL407090700","name": "Praklout","lat": "11.964826","lng": "104.615918"}

								]
							}
						]
					}
					,{
						"code":  "408"
						,"name":  "Tuek Phos"
						,"communes": [
							{
								"code": "40801",
								"name": "Akphivoadth"
								,"villages": [
									{"code": "VL408010100","name": "Srae Ta Chey","lat": "12.04887","lng": "104.525926"}
,{"code": "VL408010200","name": "Trapeang Reang","lat": "12.030976","lng": "104.583982"}
,{"code": "VL408010300","name": "Srae Prich","lat": "12.039881","lng": "104.582205"}
,{"code": "VL408010400","name": "Srae Khtum","lat": "12.000141","lng": "104.57884"}
,{"code": "VL408010500","name": "Tuek Chum","lat": "11.99826","lng": "104.567048"}
,{"code": "VL408010600","name": "Ropeak","lat": "12.007744","lng": "104.565995"}
,{"code": "VL408010700","name": "Damreb","lat": "12.043337","lng": "104.548307"}
,{"code": "VL408010800","name": "Trapeang Pring","lat": "12.008935","lng": "104.55823"}
,{"code": "VL408010900","name": "Baek Chak","lat": "12.021813","lng": "104.576381"}

								]
							}
							,{
								"code": "40802",
								"name": "Chieb"
								,"villages": [
									{"code": "VL408020100","name": "Chi Prang","lat": "12.01939","lng": "104.44735"}
,{"code": "VL408020200","name": "Tumnob Thmei","lat": "12.034062","lng": "104.414064"}
,{"code": "VL408020300","name": "Boeng Steng","lat": "12.032822","lng": "104.444282"}
,{"code": "VL408020400","name": "Prey Tang Thnong","lat": "12.0328","lng": "104.433432"}
,{"code": "VL408020500","name": "Kaoh Kandal","lat": "12.029911","lng": "104.42246"}
,{"code": "VL408020600","name": "Chhak Kandaol","lat": "12.002537","lng": "104.421664"}
,{"code": "VL408020700","name": "Kouk Penh","lat": "11.997982","lng": "104.414573"}
,{"code": "VL408020800","name": "Toap Ta Lat","lat": "12.005809","lng": "104.429759"}
,{"code": "VL408020900","name": "Sae Robang","lat": "12.034021","lng": "104.415965"}
,{"code": "VL408021000","name": "Ta Nay","lat": "12.032136","lng": "104.449731"}
,{"code": "VL408021100","name": "Kaoh Khtoum","lat": "12.053011","lng": "104.382408"}
,{"code": "VL408021200","name": "Chamcar Moch","lat": "12.05011","lng": "104.310428"}
,{"code": "VL408021300","name": "S Am","lat": "12.048863","lng": "104.300104"}
,{"code": "VL408021400","name": "Sre Samai","lat": "12.055883","lng": "104.32673"}
,{"code": "VL408021500","name": "Koh Momeu","lat": "12.059105","lng": "104.33556"}
,{"code": "VL408021600","name": "Choam","lat": "12.0526","lng": "104.293654"}
,{"code": "VL408021700","name": "Sre Chen","lat": "","lng": ""}

								]
							}
							,{
								"code": "40803",
								"name": "Chaong Maong"
								,"villages": [
									{"code": "VL408030100","name": "Chaong Maong","lat": "11.998363","lng": "104.546499"}
,{"code": "VL408030200","name": "Doun Mau","lat": "12.014483","lng": "104.517149"}
,{"code": "VL408030300","name": "Khsaet","lat": "12.005118","lng": "104.51949"}
,{"code": "VL408030400","name": "Thmei","lat": "11.998097","lng": "104.528054"}
,{"code": "VL408030500","name": "Peareang","lat": "12.010237","lng": "104.535584"}
,{"code": "VL408030600","name": "Svay Chek","lat": "12.026021","lng": "104.511451"}
,{"code": "VL408030700","name": "Akleangkae","lat": "12.025503","lng": "104.525838"}
,{"code": "VL408030800","name": "Trapeang Chum","lat": "12.026407","lng": "104.53122"}

								]
							}
							,{
								"code": "40804",
								"name": "Kbal Tuek"
								,"villages": [
									{"code": "VL408040100","name": "Krasang Doh Laeung","lat": "11.94266","lng": "104.32674"}
,{"code": "VL408040200","name": "Doung Sla","lat": "11.961394","lng": "104.303273"}
,{"code": "VL408040300","name": "Tang Khsach","lat": "11.966106","lng": "104.318287"}
,{"code": "VL408040400","name": "Tang Sya","lat": "11.96184","lng": "104.342159"}
,{"code": "VL408040500","name": "Ngoy","lat": "11.970417","lng": "104.325036"}
,{"code": "VL408040600","name": "Chipuk","lat": "11.964941","lng": "104.334161"}
,{"code": "VL408040700","name": "Moung","lat": "11.982706","lng": "104.317401"}
,{"code": "VL408040800","name": "Thnal Keang","lat": "11.888941","lng": "104.317121"}
,{"code": "VL408040900","name": "Prey Chrov","lat": "11.833975","lng": "104.327034"}
,{"code": "VL408041000","name": "Khvit Toul Khleang","lat": "11.897277","lng": "104.298185"}

								]
							}
							,{
								"code": "40805",
								"name": "Khlong Popok"
								,"villages": [
									{"code": "VL408050100","name": "Trapeang Krabau","lat": "12.039754","lng": "104.474907"}
,{"code": "VL408050200","name": "Yout","lat": "12.010978","lng": "104.46969"}
,{"code": "VL408050300","name": "Khlong Popok","lat": "12.035211","lng": "104.477957"}
,{"code": "VL408050400","name": "Ta Kab","lat": "12.027265","lng": "104.455795"}
,{"code": "VL408050500","name": "Kraoy Voat","lat": "12.038259","lng": "104.468617"}
,{"code": "VL408050600","name": "Trapeang Chrey","lat": "12.0369","lng": "104.48172"}
,{"code": "VL408050700","name": "Boeng Steng","lat": "12.036583","lng": "104.453002"}

								]
							}
							,{
								"code": "40806",
								"name": "Krang Skear"
								,"villages": [
									{"code": "VL408060100","name": "Krang Skear","lat": "12.209217","lng": "104.433676"}
,{"code": "VL408060200","name": "Tuol Samraong","lat": "12.227431","lng": "104.461255"}
,{"code": "VL408060300","name": "Phnum Ta Sam","lat": "12.164816","lng": "104.44218"}
,{"code": "VL408060400","name": "Chan Trak","lat": "12.211275","lng": "104.467824"}
,{"code": "VL408060500","name": "Trapeang Mlu","lat": "12.221876","lng": "104.460209"}
,{"code": "VL408060600","name": "Kdol","lat": "12.222074","lng": "104.38623"}
,{"code": "VL408060700","name": "Ra","lat": "12.190351","lng": "104.432153"}
,{"code": "VL408060800","name": "Damnak Ampil","lat": "12.240216","lng": "104.269187"}
,{"code": "VL408060900","name": "Ta Phoan","lat": "12.295421","lng": "104.229797"}
,{"code": "VL408061000","name": "Ou Lpoa","lat": "12.246062","lng": "104.26724"}
,{"code": "VL408061100","name": "So K'ang","lat": "12.281813","lng": "104.311527"}
,{"code": "VL408061200","name": "Anhchanh","lat": "12.264803","lng": "104.289706"}
,{"code": "VL408061300","name": "Kheang","lat": "12.20958","lng": "104.329327"}
,{"code": "VL408061400","name": "Damnak Klong","lat": "12.278887","lng": "104.206003"}
,{"code": "VL408061500","name": "Krang Skear Tboung","lat": "12.16459","lng": "104.415654"}
,{"code": "VL408061600","name": "Chambak Prasat","lat": "12.224395","lng": "104.413979"}

								]
							}
							,{
								"code": "40807",
								"name": "Tang Krasang"
								,"villages": [
									{"code": "VL408070100","name": "Chambak Kantreanh","lat": "12.112852","lng": "104.602787"}
,{"code": "VL408070200","name": "Tbaeng Khpos","lat": "12.098893","lng": "104.604829"}
,{"code": "VL408070300","name": "Chas","lat": "12.11141","lng": "104.587424"}
,{"code": "VL408070400","name": "Kouk Nang","lat": "12.099251","lng": "104.583537"}
,{"code": "VL408070500","name": "Krang Ta Mom","lat": "12.125291","lng": "104.569188"}
,{"code": "VL408070600","name": "Srae Uk","lat": "12.066858","lng": "104.583367"}
,{"code": "VL408070700","name": "Romeas","lat": "12.061196","lng": "104.52098"}
,{"code": "VL408070800","name": "Kouk Puoch","lat": "12.102244","lng": "104.583918"}
,{"code": "VL408070900","name": "Veal Sbov","lat": "12.132613","lng": "104.469065"}
,{"code": "VL408071000","name": "Thmei","lat": "12.088157","lng": "104.591043"}
,{"code": "VL408071100","name": "Tang Krasang","lat": "12.115853","lng": "104.583254"}
,{"code": "VL408071200","name": "Krang Ma","lat": "12.112406","lng": "104.570302"}
,{"code": "VL408071400","name": "Trapeang Neak","lat": "0","lng": "0"}
,{"code": "VL408071402","name": "Pleach Ptheal","lat": "0","lng": "0"}

								]
							}
							,{
								"code": "40808",
								"name": "Tuol Khpos"
								,"villages": [
									{"code": "VL408080100","name": "Roka Tong","lat": "11.993246","lng": "104.402845"}
,{"code": "VL408080200","name": "La","lat": "11.988303","lng": "104.400026"}
,{"code": "VL408080300","name": "Voat","lat": "11.977619","lng": "104.361519"}
,{"code": "VL408080400","name": "Trapeang Smach","lat": "11.985562","lng": "104.378796"}
,{"code": "VL408080500","name": "Srae Chan","lat": "11.982684","lng": "104.373852"}
,{"code": "VL408080600","name": "Slaeng","lat": "11.977409","lng": "104.356385"}
,{"code": "VL408080700","name": "Rolung","lat": "11.942261","lng": "104.385434"}
,{"code": "VL408080800","name": "O Kél","lat": "","lng": ""}
,{"code": "VL408080900","name": "Paileang","lat": "11.909431","lng": "104.348295"}
,{"code": "VL408081000","name": "O Spean","lat": "11.924898","lng": "104.361803"}

								]
							}
						]
					}

				]
			}
			,{
				"code": "05"
				,"name": "Kampong Speu"
				,"districts":[
					{
						"code":  "507"
						,"name":  "Samraong Tong"
						,"communes": [
							{
								"code": "50706",
								"name": "Roleang Kreul"
								,"villages": [
									
								]
							}
							,{
								"code": "50701",
								"name": "Roleang Chak"
								,"villages": [
									
								]
							}
							,{
								"code": "50702",
								"name": "Kahaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "50703",
								"name": "Khtum Krang"
								,"villages": [
									
								]
							}
							,{
								"code": "50704",
								"name": "Krang Ampil"
								,"villages": [
									
								]
							}
							,{
								"code": "50705",
								"name": "Pneay"
								,"villages": [
									
								]
							}
							,{
								"code": "50707",
								"name": "Samraong Tong"
								,"villages": [
									
								]
							}
							,{
								"code": "50708",
								"name": "Sambour"
								,"villages": [
									
								]
							}
							,{
								"code": "50709",
								"name": "Saen Dei"
								,"villages": [
									
								]
							}
							,{
								"code": "50710",
								"name": "Skuh"
								,"villages": [
									
								]
							}
							,{
								"code": "50711",
								"name": "Tang Krouch"
								,"villages": [
									
								]
							}
							,{
								"code": "50712",
								"name": "Thummoda Ar"
								,"villages": [
									
								]
							}
							,{
								"code": "50713",
								"name": "Trapeang Kong"
								,"villages": [
									
								]
							}
							,{
								"code": "50714",
								"name": "Tumpoar Meas"
								,"villages": [
									
								]
							}
							,{
								"code": "50715",
								"name": "Voa Sa"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "501"
						,"name":  "Basedth"
						,"communes": [
							{
								"code": "50101",
								"name": "Basedth"
								,"villages": [
									
								]
							}
							,{
								"code": "50102",
								"name": "Kat Phluk"
								,"villages": [
									
								]
							}
							,{
								"code": "50103",
								"name": "Nitean"
								,"villages": [
									
								]
							}
							,{
								"code": "50104",
								"name": "Pheakdei"
								,"villages": [
									
								]
							}
							,{
								"code": "50105",
								"name": "Pheari Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "50106",
								"name": "Phong"
								,"villages": [
									
								]
							}
							,{
								"code": "50107",
								"name": "Pou Angkrang"
								,"villages": [
									
								]
							}
							,{
								"code": "50108",
								"name": "Pou Chamraeun"
								,"villages": [
									
								]
							}
							,{
								"code": "50109",
								"name": "Pou Mreal"
								,"villages": [
									
								]
							}
							,{
								"code": "50110",
								"name": "Svay Chacheb"
								,"villages": [
									
								]
							}
							,{
								"code": "50111",
								"name": "Tuol Ampil"
								,"villages": [
									
								]
							}
							,{
								"code": "50112",
								"name": "Tuol Sala"
								,"villages": [
									
								]
							}
							,{
								"code": "50113",
								"name": "Kak"
								,"villages": [
									
								]
							}
							,{
								"code": "50114",
								"name": "Svay Rumpea"
								,"villages": [
									
								]
							}
							,{
								"code": "50115",
								"name": "Preah Khae"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "502"
						,"name":  "Chbar Mon"
						,"communes": [
							{
								"code": "50201",
								"name": "Chbar Mon"
								,"villages": [
									
								]
							}
							,{
								"code": "50202",
								"name": "Kandaol Dom"
								,"villages": [
									
								]
							}
							,{
								"code": "50203",
								"name": "Roka Thum"
								,"villages": [
									
								]
							}
							,{
								"code": "50204",
								"name": "Sopoar Tep"
								,"villages": [
									
								]
							}
							,{
								"code": "50205",
								"name": "Svay Kravan"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "503"
						,"name":  "Kong Pisei"
						,"communes": [
							{
								"code": "50301",
								"name": "Angk Popel"
								,"villages": [
									
								]
							}
							,{
								"code": "50302",
								"name": "Chongruk"
								,"villages": [
									
								]
							}
							,{
								"code": "50303",
								"name": "Moha Ruessei"
								,"villages": [
									
								]
							}
							,{
								"code": "50304",
								"name": "Pechr Muni"
								,"villages": [
									
								]
							}
							,{
								"code": "50305",
								"name": "Preah Nipean"
								,"villages": [
									
								]
							}
							,{
								"code": "50306",
								"name": "Prey Nheat"
								,"villages": [
									
								]
							}
							,{
								"code": "50307",
								"name": "Prey Vihear"
								,"villages": [
									
								]
							}
							,{
								"code": "50308",
								"name": "Roka Kaoh"
								,"villages": [
									
								]
							}
							,{
								"code": "50309",
								"name": "Sdok"
								,"villages": [
									
								]
							}
							,{
								"code": "50310",
								"name": "Snam Krapeu"
								,"villages": [
									
								]
							}
							,{
								"code": "50311",
								"name": "Srang"
								,"villages": [
									
								]
							}
							,{
								"code": "50312",
								"name": "Tuek L'ak"
								,"villages": [
									
								]
							}
							,{
								"code": "50313",
								"name": "Veal"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "504"
						,"name":  "Aoral"
						,"communes": [
							{
								"code": "50401",
								"name": "Haong Samnam"
								,"villages": [
									
								]
							}
							,{
								"code": "50402",
								"name": "Reaksmei Sameakki"
								,"villages": [
									
								]
							}
							,{
								"code": "50403",
								"name": "Trapeang Chour"
								,"villages": [
									
								]
							}
							,{
								"code": "50404",
								"name": "Sangkae Satob"
								,"villages": [
									
								]
							}
							,{
								"code": "50405",
								"name": "Ta Sal"
								,"villages": [
									
								]
							}
							,{
								"code": "50407",
								"name": "Chh'en"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "505"
						,"name":  "Odongk"
						,"communes": [
							{
								"code": "50501",
								"name": "Chant Saen"
								,"villages": [
									
								]
							}
							,{
								"code": "50502",
								"name": "Cheung Roas"
								,"villages": [
									
								]
							}
							,{
								"code": "50503",
								"name": "Chumpu Proeks"
								,"villages": [
									
								]
							}
							,{
								"code": "50504",
								"name": "Khsem Khsan"
								,"villages": [
									
								]
							}
							,{
								"code": "50505",
								"name": "Krang Chek"
								,"villages": [
									
								]
							}
							,{
								"code": "50506",
								"name": "Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "50507",
								"name": "Preah Srae"
								,"villages": [
									
								]
							}
							,{
								"code": "50508",
								"name": "Prey Krasang"
								,"villages": [
									
								]
							}
							,{
								"code": "50509",
								"name": "Trach Tong"
								,"villages": [
									
								]
							}
							,{
								"code": "50510",
								"name": "Veal Pung"
								,"villages": [
									
								]
							}
							,{
								"code": "50511",
								"name": "Veang Chas"
								,"villages": [
									
								]
							}
							,{
								"code": "50512",
								"name": "Yutth Sameakki"
								,"villages": [
									
								]
							}
							,{
								"code": "50513",
								"name": "Damnak Reang"
								,"villages": [
									
								]
							}
							,{
								"code": "50514",
								"name": "Peang Lvea"
								,"villages": [
									
								]
							}
							,{
								"code": "50515",
								"name": "Phnum Touch"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "506"
						,"name":  "Phnum Sruoch"
						,"communes": [
							{
								"code": "50610",
								"name": "Tang Samraong"
								,"villages": [
									
								]
							}

						]
					}
					,{
						"code":  "508"
						,"name":  "Thpong"
						,"communes": [
							{
								"code": "50801",
								"name": "Amleang"
								,"villages": [
									
								]
							}
							,{
								"code": "50802",
								"name": "Monourom"
								,"villages": [
									
								]
							}
							,{
								"code": "50804",
								"name": "Prambei Mom"
								,"villages": [
									
								]
							}
							,{
								"code": "50805",
								"name": "Rung Roeang"
								,"villages": [
									
								]
							}
							,{
								"code": "50806",
								"name": "Toap Mean"
								,"villages": [
									
								]
							}
							,{
								"code": "50807",
								"name": "Veal Pon"
								,"villages": [
									
								]
							}
							,{
								"code": "50808",
								"name": "Yeang Angk"
								,"villages": [
									
								]
							}
						]
					}
				]
			}
			,{
				"code": "06"
				,"name": "Kampong Thom"
				,"districts":[
					{
						"code":  "601"
						,"name":  "Baray"
						,"communes": [
							{
								"code": "60101",
								"name": "Bak Snar"
								,"villages": [
									
								]
							}
							,{
								"code": "60102",
								"name": "Ballangk"
								,"villages": [
									
								]
							}
							,{
								"code": "60103",
								"name": "Baray"
								,"villages": [
									
								]
							}
							,{
								"code": "60104",
								"name": "Boeng"
								,"villages": [
									
								]
							}
							,{
								"code": "60105",
								"name": "Chaeung Daeung"
								,"villages": [
									
								]
							}
							,{
								"code": "60106",
								"name": "Chraneang"
								,"villages": [
									
								]
							}
							,{
								"code": "60107",
								"name": "Chhuk Khsach"
								,"villages": [
									
								]
							}
							,{
								"code": "60108",
								"name": "Chong Doung"
								,"villages": [
									
								]
							}
							,{
								"code": "60109",
								"name": "Chrolong"
								,"villages": [
									
								]
							}
							,{
								"code": "60110",
								"name": "Kokir Thum"
								,"villages": [
									
								]
							}
							,{
								"code": "60111",
								"name": "Krava"
								,"villages": [
									
								]
							}
							,{
								"code": "60112",
								"name": "Andoung Pou"
								,"villages": [
									
								]
							}
							,{
								"code": "60113",
								"name": "Pongro"
								,"villages": [
									
								]
							}
							,{
								"code": "60114",
								"name": "Sou Young"
								,"villages": [
									
								]
							}
							,{
								"code": "60115",
								"name": "Sralau"
								,"villages": [
									
								]
							}
							,{
								"code": "60116",
								"name": "Svay Phleung"
								,"villages": [
									
								]
							}
							,{
								"code": "60117",
								"name": "Tnaot Chum"
								,"villages": [
									
								]
							}
							,{
								"code": "60118",
								"name": "Triel"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "602"
						,"name":  "Kampong Svay"
						,"communes": [
							{
								"code": "60201",
								"name": "Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "60202",
								"name": "Damrei Slab"
								,"villages": [
									
								]
							}
							,{
								"code": "60203",
								"name": "Kampong Kou"
								,"villages": [
									
								]
							}
							,{
								"code": "60204",
								"name": "Kampong Svay"
								,"villages": [
									
								]
							}
							,{
								"code": "60205",
								"name": "Nipechr"
								,"villages": [
									
								]
							}
							,{
								"code": "60206",
								"name": "Phat Sanday"
								,"villages": [
									
								]
							}
							,{
								"code": "60207",
								"name": "San Kor"
								,"villages": [
									
								]
							}
							,{
								"code": "60208",
								"name": "Tbaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "60209",
								"name": "Trapeang Ruessei"
								,"villages": [
									
								]
							}
							,{
								"code": "60210",
								"name": "Kdei Doung"
								,"villages": [
									
								]
							}
							,{
								"code": "60211",
								"name": "Prey Kuy"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "603"
						,"name":  "Stueng Saen"
						,"communes": [
							{
								"code": "60301",
								"name": "Damrei Choan Khla"
							}
							,{
								"code": "60302",
								"name": "Kampong Thum"
								,"villages": [
									
								]
							}
							,{
								"code": "60303",
								"name": "Kampong Roteh"
								,"villages": [
									
								]
							}
							,{
								"code": "60304",
								"name": "Ou Kanthor"
								,"villages": [
									
								]
							}
							,{
								"code": "60306",
								"name": "Kampong Krabau"
								,"villages": [
									
								]
							}
							,{
								"code": "60308",
								"name": "Prey Ta Hu"
								,"villages": [
									
								]
							}
							,{
								"code": "60309",
								"name": "Achar Leak"
								,"villages": [
									
								]
							}
							,{
								"code": "60310",
								"name": "Srayov"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "604"
						,"name":  "Prasat Ballangk"
						,"communes": [
							{
								"code": "60401",
								"name": "Doung"
								,"villages": [
									
								]
							}
							,{
								"code": "60402",
								"name": "Kraya"
								,"villages": [
									
								]
							}
							,{
								"code": "60403",
								"name": "Phan Nheum"
								,"villages": [
									
								]
							}
							,{
								"code": "60404",
								"name": "Sakream"
								,"villages": [
									
								]
							}
							,{
								"code": "60405",
								"name": "Sala Visai"
								,"villages": [
									
								]
							}
							,{
								"code": "60406",
								"name": "Sameakki"
								,"villages": [
									
								]
							}
							,{
								"code": "60407",
								"name": "Tuol Kreul"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "605"
						,"name":  "Prasat Sambour"
						,"communes": [
							{
								"code": "60501",
								"name": "Chhuk"
								,"villages": [
									
								]
							}
							,{
								"code": "60502",
								"name": "Koul"
								,"villages": [
									
								]
							}
							,{
								"code": "60503",
								"name": "Sambour"
								,"villages": [
									
								]
							}
							,{
								"code": "60504",
								"name": "Sraeung"
								,"villages": [
									
								]
							}
							,{
								"code": "60505",
								"name": "Tang Krasau"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "606"
						,"name":  "Sandan"
						,"communes": [
							{
								"code": "60601",
								"name": "Chheu Teal"
								,"villages": [
									
								]
							}
							,{
								"code": "60602",
								"name": "Dang Kambet"
								,"villages": [
									
								]
							}
							,{
								"code": "60603",
								"name": "Klaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "60604",
								"name": "Mean Rith"
								,"villages": [
									
								]
							}
							,{
								"code": "60605",
								"name": "Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "60606",
								"name": "Ngon"
								,"villages": [
									
								]
							}
							,{
								"code": "60607",
								"name": "Sandan"
								,"villages": [
									
								]
							}
							,{
								"code": "60608",
								"name": "Sochet"
								,"villages": [
									
								]
							}
							,{
								"code": "60609",
								"name": "Tumring"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "607"
						,"name":  "Santuk"
						,"communes": [
							{
								"code": "60701",
								"name": "Boeng Lvea"
								,"villages": [
									
								]
							}
							,{
								"code": "60702",
								"name": "Chroab"
								,"villages": [
									
								]
							}
							,{
								"code": "60703",
								"name": "Kampong Thma"
								,"villages": [
									
								]
							}
							,{
								"code": "60704",
								"name": "Kakaoh"
								,"villages": [
									
								]
							}
							,{
								"code": "60705",
								"name": "Kraya"
								,"villages": [
									
								]
							}
							,{
								"code": "60706",
								"name": "Pnov"
								,"villages": [
									
								]
							}
							,{
								"code": "60707",
								"name": "Prasat"
								,"villages": [
									
								]
							}
							,{
								"code": "60708",
								"name": "Tang Krasang"
								,"villages": [
									
								]
							}
							,{
								"code": "60709",
								"name": "Ti Pou"
								,"villages": [
									
								]
							}
							,{
								"code": "60710",
								"name": "Tboung Krapeu"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "608"
						,"name":  "Stoung"
						,"communes": [
							{
								"code": "60801",
								"name": "Banteay Stoung"
								,"villages": [
									
								]
							}
							,{
								"code": "60802",
								"name": "Chamnar Kraom"
								,"villages": [
									
								]
							}
							,{
								"code": "60803",
								"name": "Chamnar Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "60804",
								"name": "Kampong Chen Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "60805",
								"name": "Kampong Chen Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "60806",
								"name": "Msar Krang"
								,"villages": [
									
								]
							}
							,{
								"code": "60807",
								"name": "Peam Bang"
								,"villages": [
									
								]
							}
							,{
								"code": "60808",
								"name": "Popok"
								,"villages": [
									
								]
							}
							,{
								"code": "60809",
								"name": "Pralay"
								,"villages": [
									
								]
							}
							,{
								"code": "60810",
								"name": "Preah Damrei"
								,"villages": [
									
								]
							}
							,{
								"code": "60811",
								"name": "Rung Roeang"
								,"villages": [
									
								]
							}
							,{
								"code": "60812",
								"name": "Samprouch"
								,"villages": [
									
								]
							}
							,{
								"code": "60813",
								"name": "Trea"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "07"
				,"name": "Kampot"
				,"districts":[
					{
						"code":  "701"
						,"name":  "Angkor Chey"
						,"communes": [
							{
								"code": "70101",
								"name": "Angk Phnum Touch"
								,"villages": [
									
								]
							}
							,{
								"code": "70102",
								"name": "Ankor Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "70103",
								"name": "Champei"
								,"villages": [
									
								]
							}
							,{
								"code": "70104",
								"name": "Dambouk Khpos"
								,"villages": [
									
								]
							}
							,{
								"code": "70105",
								"name": "Dan Koum"
								,"villages": [
									
								]
							}
							,{
								"code": "70106",
								"name": "Daeum Doung"
								,"villages": [
									
								]
							}
							,{
								"code": "70107",
								"name": "Mroum"
								,"villages": [
									
								]
							}
							,{
								"code": "70108",
								"name": "Phnum Kong"
								,"villages": [
									
								]
							}
							,{
								"code": "70109",
								"name": "Praphnum"
								,"villages": [
									
								]
							}
							,{
								"code": "70110",
								"name": "Samlanh"
								,"villages": [
									
								]
							}
							,{
								"code": "70111",
								"name": "Tani"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "702"
						,"name":  "Banteay Meas"
						,"communes": [
							{
								"code": "70201",
								"name": "Banteay Meas Khang Kaeut"
								,"villages": [
									
								]
							}
							,{
								"code": "70202",
								"name": "Banteay Meas Khang lech"
								,"villages": [
									
								]
							}
							,{
								"code": "70203",
								"name": "Prey Tonle"
								,"villages": [
									
								]
							}
							,{
								"code": "70204",
								"name": "Samraong Kraom"
								,"villages": [
									
								]
							}
							,{
								"code": "70205",
								"name": "Samraong Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "70206",
								"name": "Sdach Kong Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70207",
								"name": "Sdach Kong Khang lech"
								,"villages": [
									
								]
							}
							,{
								"code": "70208",
								"name": "Sdach Kong Khang Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "70209",
								"name": "Tnoat Chong Srang"
								,"villages": [
									
								]
							}
							,{
								"code": "70210",
								"name": "Trapeang Sala Khang Kaeut"
								,"villages": [
									
								]
							}
							,{
								"code": "70211",
								"name": "Trapeang Sala Khang Lech"
								,"villages": [
									
								]
							}
							,{
								"code": "70212",
								"name": "Tuk Meas Khang Kaeut"
								,"villages": [
									
								]
							}
							,{
								"code": "70213",
								"name": "Tuk Meas Khang Lech"
								,"villages": [
									
								]
							}
							,{
								"code": "70214",
								"name": "Voat Angk Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70215",
								"name": "Voat Angk Khang Tboung"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "703"
						,"name":  "Chhuk"
						,"communes": [
							{
								"code": "70301",
								"name": "Baniev"
								,"villages": [
									
								]
							}
							,{
								"code": "70302",
								"name": "Takaen"
								,"villages": [
									
								]
							}
							,{
								"code": "70303",
								"name": "Boeng Nimol"
								,"villages": [
									
								]
							}
							,{
								"code": "70304",
								"name": "Chhuk"
								,"villages": [
									
								]
							}
							,{
								"code": "70305",
								"name": "Doun Yay"
								,"villages": [
									
								]
							}
							,{
								"code": "70306",
								"name": "Krang Sbov"
								,"villages": [
									
								]
							}
							,{
								"code": "70307",
								"name": "Krang Snay"
								,"villages": [
									
								]
							}
							,{
								"code": "70308",
								"name": "Lbaeuk"
								,"villages": [
									
								]
							}
							,{
								"code": "70309",
								"name": "Trapeang Phleang"
								,"villages": [
									
								]
							}
							,{
								"code": "70310",
								"name": "Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "70311",
								"name": "Neareay"
								,"villages": [
									
								]
							}
							,{
								"code": "70312",
								"name": "Satr Pong"
								,"villages": [
									
								]
							}
							,{
								"code": "70313",
								"name": "Trapeang Bei"
								,"villages": [
									
								]
							}
							,{
								"code": "70314",
								"name": "Tramaeng"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "704"
						,"name":  "Chum Kiri"
						,"communes": [
							{
								"code": "70401",
								"name": "Chres"
								,"villages": [
									
								]
							}
							,{
								"code": "70402",
								"name": "Chumpu Voan"
								,"villages": [
									
								]
							}
							,{
								"code": "70403",
								"name": "Snay Anhchit"
								,"villages": [
									
								]
							}
							,{
								"code": "70404",
								"name": "Srae Chaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "70405",
								"name": "Srae Knong"
								,"villages": [
									
								]
							}
							,{
								"code": "70406",
								"name": "Srae Samraong"
								,"villages": [
									
								]
							}
							,{
								"code": "70407",
								"name": "Trapeang Reang"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "705"
						,"name":  "Dang Tong"
						,"communes": [
							{
								"code": "70501",
								"name": "Damnak Sokram"
								,"villages": [
									
								]
							}
							,{
								"code": "70502",
								"name": "Dang Tong"
								,"villages": [
									
								]
							}
							,{
								"code": "70503",
								"name": "Khcheay Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70504",
								"name": "Khcheay Khang Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "70505",
								"name": "Mean Ritth"
								,"villages": [
									
								]
							}
							,{
								"code": "70506",
								"name": "Srae Chea Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70507",
								"name": "Srae Chea Khang Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "70508",
								"name": "Totung"
								,"villages": [
									
								]
							}
							,{
								"code": "70509",
								"name": "Angkor Meas"
								,"villages": [
									
								]
							}
							,{
								"code": "70510",
								"name": "L'ang"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "706"
						,"name":  "Kampong Trach"
						,"communes": [
							{
								"code": "70601",
								"name": "Boeng Sala Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70602",
								"name": "Boeng Sala Khang Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "70603",
								"name": "Damnak Kantuot Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70604",
								"name": "Damnak Kantuot Khang Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "70605",
								"name": "Kampong Trach Khang Kaeut"
								,"villages": [
									
								]
							}
							,{
								"code": "70606",
								"name": "Kampong Trach Khang Lech"
								,"villages": [
									
								]
							}
							,{
								"code": "70607",
								"name": "Kanthaor Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70608",
								"name": "Kanthaor Khang Kaeut"
								,"villages": [
									
								]
							}
							,{
								"code": "70609",
								"name": "Kanthaor Khang Lech"
								,"villages": [
									
								]
							}
							,{
								"code": "70612",
								"name": "Preaek Kroes"
								,"villages": [
									
								]
							}
							,{
								"code": "70613",
								"name": "Ruessei Srok Khang Kaeut"
								,"villages": [
									
								]
							}
							,{
								"code": "70614",
								"name": "Ruessei Srok Khang Lech"
								,"villages": [
									
								]
							}
							,{
								"code": "70615",
								"name": "Svay Tong Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "70616",
								"name": "Svay Tong Khang Tboung"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "707"
						,"name":  "Kampot"
						,"communes": [
							{
								"code": "70701",
								"name": "Boeng Tuk"
								,"villages": [
									
								]
							}
							,{
								"code": "70702",
								"name": "Chum Kriel"
								,"villages": [
									
								]
							}
							,{
								"code": "70703",
								"name": "Kampong Kraeng"
								,"villages": [
									
								]
							}
							,{
								"code": "70704",
								"name": "Kampong Samraong"
								,"villages": [
									
								]
							}
							,{
								"code": "70705",
								"name": "Kandal"
								,"villages": [
									
								]
							}
							,{
								"code": "70707",
								"name": "Kaoh Touch"
								,"villages": [
									
								]
							}
							,{
								"code": "70708",
								"name": "Koun Satv"
								,"villages": [
									
								]
							}
							,{
								"code": "70709",
								"name": "Makprang"
								,"villages": [
									
								]
							}
							,{
								"code": "70711",
								"name": "Preaek Tnoat"
								,"villages": [
									
								]
							}
							,{
								"code": "70712",
								"name": "Prey Khmum"
								,"villages": [
									
								]
							}
							,{
								"code": "70713",
								"name": "Prey Thnang"
								,"villages": [
									
								]
							}
							,{
								"code": "70715",
								"name": "Stueng Kaev"
								,"villages": [
									
								]
							}
							,{
								"code": "70716",
								"name": "Thmei"
								,"villages": [
									
								]
							}
							,{
								"code": "70717",
								"name": "Trapeang Pring"
								,"villages": [
									
								]
							}
							,{
								"code": "70718",
								"name": "Trapeang Sangkae"
								,"villages": [
									
								]
							}
							,{
								"code": "70719",
								"name": "Trapeang Thum"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "708"
						,"name":  "Kampong Bay"
						,"communes": [
							{
								"code": "70801",
								"name": "Kampong Kandal"
								,"villages": [
									
								]
							}
							,{
								"code": "70802",
								"name": "Krang Ampil"
								,"villages": [
									
								]
							}
							,{
								"code": "70803",
								"name": "Kampong Bay"
								,"villages": [
									
								]
							}
							,{
								"code": "70804",
								"name": "Andoung Khmaer"
								,"villages": [
									
								]
							}
							,{
								"code": "70805",
								"name": "Traeuy Kaoh"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "09"
				,"name": "Koh Kong"
				,"districts":[
					{
						"code":  "901"
						,"name":  "Botum Sakor"
						,"communes": [
							{
								"code": "90101",
								"name": "Andaung Tuek"
								,"villages": [
									
								]
							}
							,{
								"code": "90102",
								"name": "Kandaol"
								,"villages": [
									
								]
							}
							,{
								"code": "90103",
								"name": "Ta Noun"
								,"villages": [
									
								]
							}
							,{
								"code": "90104",
								"name": "Thma Sa"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "902"
						,"name":  "Kiri Sakor"
						,"communes": [
							{
								"code": "90201",
								"name": "Kaoh Sdach"
								,"villages": [
									
								]
							}
							,{
								"code": "90202",
								"name": "Phnhi Meas"
								,"villages": [
									
								]
							}
							,{
								"code": "90203",
								"name": "Preaek Khsach"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "903"
						,"name":  "Kaoh Kong"
						,"communes": [
							{
								"code": "90301",
								"name": "Chrouy Pras"
								,"villages": [
									
								]
							}
							,{
								"code": "90302",
								"name": "Kaoh Kapi"
								,"villages": [
									
								]
							}
							,{
								"code": "90303",
								"name": "Ta Tai Kraom"
								,"villages": [
									
								]
							}
							,{
								"code": "90304",
								"name": "Trapeang Rung"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "904"
						,"name":  "Smach Mean Chey"
						,"communes": [
							{
								"code": "90401",
								"name": "Smach Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "90402",
								"name": "Dang Tong"
								,"villages": [
									
								]
							}
							,{
								"code": "90403",
								"name": "Stueng Veaeng"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "905"
						,"name":  "Mondol Seima"
						,"communes": [
							{
								"code": "90501",
								"name": "Bak Khlang"
								,"villages": [
									
								]
							}
							,{
								"code": "90502",
								"name": "Peam Krasaob"
								,"villages": [
									
								]
							}
							,{
								"code": "90503",
								"name": "Tuol Kokir"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "906"
						,"name":  "Srae Ambel"
						,"communes": [
							{
								"code": "90601",
								"name": "Boeng Preav"
								,"villages": [
									
								]
							}
							,{
								"code": "90602",
								"name": "Chi Kha Kraom"
								,"villages": [
									
								]
							}
							,{
								"code": "90603",
								"name": "Chi kha Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "90604",
								"name": "Chrouy Svay"
								,"villages": [
									
								]
							}
							,{
								"code": "90605",
								"name": "Dang Peaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "90606",
								"name": "Srae Ambel"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "907"
						,"name":  "Thma Bang"
						,"communes": [
							{
								"code": "90701",
								"name": "Ta Tey Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "90702",
								"name": "Pralay"
								,"villages": [
									
								]
							}
							,{
								"code": "90703",
								"name": "Chumnoab"
								,"villages": [
									
								]
							}
							,{
								"code": "90704",
								"name": "Ruessei Chrum"
								,"villages": [
									
								]
							}
							,{
								"code": "90705",
								"name": "Chi Phat"
								,"villages": [
									
								]
							}
							,{
								"code": "90706",
								"name": "Thma Choun Pau"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "10"
				,"name": "Kratie"
				,"districts":[
					{
						"code":  "1001"
						,"name":  "Chhloung"
						,"communes": [
							{
								"code": "100101",
								"name": "Chhloung"
								,"villages": [
									
								]
							}
							,{
								"code": "100103",
								"name": "Han Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "100105",
								"name": "Kanhchor"
								,"villages": [
									
								]
							}
							,{
								"code": "100106",
								"name": "Khsach Andaet"
								,"villages": [
									
								]
							}
							,{
								"code": "100107",
								"name": "Pongro"
								,"villages": [
									
								]
							}
							,{
								"code": "100108",
								"name": "Preaek Saman"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1002"
						,"name":  "Kracheh"
						,"communes": [
							{
								"code": "100207",
								"name": "Kaoh Trong"
								,"villages": [
									
								]
							}
							,{
								"code": "100208",
								"name": "Krakor"
								,"villages": [
									
								]
							}
							,{
								"code": "100209",
								"name": "Kracheh"
								,"villages": [
									
								]
							}
							,{
								"code": "100210",
								"name": "Ou Ruessei"
								,"villages": [
									
								]
							}
							,{
								"code": "100211",
								"name": "Roka Kandal"
								,"villages": [
									
								]
							}
							,{
								"code": "100215",
								"name": "Thmei"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1003"
						,"name":  "Preaek Prasab"
						,"communes": [
							{
								"code": "100301",
								"name": "Chambak"
								,"villages": [
									
								]
							}
							,{
								"code": "100303",
								"name": "Kampong Kor"
								,"villages": [
									
								]
							}
							,{
								"code": "100304",
								"name": "Kaoh Ta Suy"
								,"villages": [
									
								]
							}
							,{
								"code": "100305",
								"name": "Preaek Prasab"
								,"villages": [
									
								]
							}
							,{
								"code": "100306",
								"name": "Ruessei Kaev"
								,"villages": [
									
								]
							}
							,{
								"code": "100308",
								"name": "Ta Mau"
								,"villages": [
									
								]
							}
							,{
								"code": "100601",
								"name": "Bos Leav"
								,"villages": [
									
								]
							}
							,{
								"code": "100607",
								"name": "Sambok"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1004"
						,"name":  "Sambour"
						,"communes": [
							{
								"code": "100401",
								"name": "Boeng Char"
								,"villages": [
									
								]
							}
							,{
								"code": "100402",
								"name": "Kampong Cham"
								,"villages": [
									
								]
							}
							,{
								"code": "100403",
								"name": "Kbal Damrei"
								,"villages": [
									
								]
							}
							,{
								"code": "100404",
								"name": "Kaoh Khnhaer"
								,"villages": [
									
								]
							}
							,{
								"code": "100405",
								"name": "Ou Krieng"
								,"villages": [
									
								]
							}
							,{
								"code": "100406",
								"name": "Roluos Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "100407",
								"name": "Sambour"
								,"villages": [
									
								]
							}
							,{
								"code": "100408",
								"name": "Sandan"
								,"villages": [
									
								]
							}
							,{
								"code": "100409",
								"name": "Srae Chis"
								,"villages": [
									
								]
							}
							,{
								"code": "100410",
								"name": "Vodtheaknak"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1005"
						,"name":  "Snuol"
						,"communes": [
							{
								"code": "100501",
								"name": "Khsuem"
								,"villages": [
									
								]
							}
							,{
								"code": "100502",
								"name": "Pir Thnu"
								,"villages": [
									
								]
							}
							,{
								"code": "100503",
								"name": "Snuol"
								,"villages": [
									
								]
							}
							,{
								"code": "100504",
								"name": "Srae Char"
								,"villages": [
									
								]
							}
							,{
								"code": "100505",
								"name": "Svay Chreah"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1006"
						,"name":  "Chitr Borie"
						,"communes": [
							{
								"code": "100602",
								"name": "Changkrang"
								,"villages": [
									
								]
							}
							,{
								"code": "100603",
								"name": "Dar"
								,"villages": [
									
								]
							}
							,{
								"code": "100604",
								"name": "Kantuot"
								,"villages": [
									
								]
							}
							,{
								"code": "100605",
								"name": "Kou Loab"
								,"villages": [
									
								]
							}
							,{
								"code": "100606",
								"name": "Kaoh Chraeng"
								,"villages": [
									
								]
							}
							,{
								"code": "100608",
								"name": "Thma Andaeuk"
								,"villages": [
									
								]
							}
							,{
								"code": "100609",
								"name": "Thma Kreae"
								,"villages": [
									
								]
							}
							,{
								"code": "100610",
								"name": "Thmei"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "11"
				,"name": "Mondul Kiri"
				,"districts":[
					{
						"code":  "1101"
						,"name":  "Keo Seima"
						,"communes": [
							{
								"code": "110101",
								"name": "Chong Phlah"
								,"villages": [
									
								]
							}
							,{
								"code": "110102",
								"name": "Memang"
								,"villages": [
									
								]
							}
							,{
								"code": "110103",
								"name": "Srae Chhuk"
								,"villages": [
									
								]
							}
							,{
								"code": "110104",
								"name": "Srae Khtum"
								,"villages": [
									
								]
							}
							,{
								"code": "110105",
								"name": "Srae Preah"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1102"
						,"name":  "Kaoh Nheaek"
						,"communes": [
							{
								"code": "110201",
								"name": "Nang Khi Loek"
								,"villages": [
									
								]
							}
							,{
								"code": "110202",
								"name": "Ou Buon Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "110203",
								"name": "Roy"
								,"villages": [
									
								]
							}
							,{
								"code": "110204",
								"name": "Sokh Sant"
								,"villages": [
									
								]
							}
							,{
								"code": "110205",
								"name": "Srae Huy"
								,"villages": [
									
								]
							}
							,{
								"code": "110206",
								"name": "Srae Sangkom"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1103"
						,"name":  "Ou Reang"
						,"communes": [
							{
								"code": "110301",
								"name": "Dak Dam"
								,"villages": [
									
								]
							}
							,{
								"code": "110302",
								"name": "Sen Monorom"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1104"
						,"name":  "Pech Chreada"
						,"communes": [
							{
								"code": "110401",
								"name": "Krang Teh"
								,"villages": [
									
								]
							}
							,{
								"code": "110402",
								"name": "Pou Chrei"
								,"villages": [
									
								]
							}
							,{
								"code": "110403",
								"name": "Srae Ampum"
								,"villages": [
									
								]
							}
							,{
								"code": "110404",
								"name": "Bu Sra"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1105"
						,"name":  "Saen Monourom"
						,"communes": [
							{
								"code": "110501",
								"name": "Monourom"
								,"villages": [
									
								]
							}
							,{
								"code": "110502",
								"name": "Sokh Dom"
								,"villages": [
									
								]
							}
							,{
								"code": "110503",
								"name": "Spean Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "110504",
								"name": "Romonea"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "13"
				,"name": "Preah Vihear"
				,"districts":[
					{
						"code":  "1301"
						,"name":  "Chey Saen"
						,"communes": [
							{
								"code": "130101",
								"name": "S'ang"
								,"villages": [
									
								]
							}
							,{
								"code": "130102",
								"name": "Tasu"
								,"villages": [
									
								]
							}
							,{
								"code": "130103",
								"name": "Khyang"
								,"villages": [
									
								]
							}
							,{
								"code": "130104",
								"name": "Chrach"
								,"villages": [
									
								]
							}
							,{
								"code": "130105",
								"name": "Thmea"
								,"villages": [
									
								]
							}
							,{
								"code": "130106",
								"name": "Putrea"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1302"
						,"name":  "Chhaeb"
						,"communes": [
							{
								"code": "130201",
								"name": "Chhaeb Muoy"
								,"villages": [
									
								]
							}
							,{
								"code": "130202",
								"name": "Chhaeb Pir"
								,"villages": [
									
								]
							}
							,{
								"code": "130203",
								"name": "Sangkae Muoy"
								,"villages": [
									
								]
							}
							,{
								"code": "130204",
								"name": "Sangkae Pir"
								,"villages": [
									
								]
							}
							,{
								"code": "130205",
								"name": "Mlu Prey Muoy"
								,"villages": [
									
								]
							}
							,{
								"code": "130206",
								"name": "Mlu Prey Pir"
								,"villages": [
									
								]
							}
							,{
								"code": "130207",
								"name": "Kampong Sralau Muoy"
								,"villages": [
									
								]
							}
							,{
								"code": "130208",
								"name": "Kampong Sralau Pir"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1303"
						,"name":  "Choam Khsant"
						,"communes": [
							{
								"code": "130301",
								"name": "Choam Khsant"
								,"villages": [
									
								]
							}
							,{
								"code": "130302",
								"name": "Tuek Kraham"
								,"villages": [
									
								]
							}
							,{
								"code": "130303",
								"name": "Pring Thum"
								,"villages": [
									
								]
							}
							,{
								"code": "130304",
								"name": "Rumdaoh Srae"
								,"villages": [
									
								]
							}
							,{
								"code": "130305",
								"name": "Yeang"
								,"villages": [
									
								]
							}
							,{
								"code": "130306",
								"name": "Kantuot"
								,"villages": [
									
								]
							}
							,{
								"code": "130307",
								"name": "Sra Em"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1304"
						,"name":  "Kuleaen"
						,"communes": [
							{
								"code": "130401",
								"name": "Kuleaen Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "130402",
								"name": "Kuleaen Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "130403",
								"name": "Thmei"
								,"villages": [
									
								]
							}
							,{
								"code": "130404",
								"name": "Phnum Penh"
								,"villages": [
									
								]
							}
							,{
								"code": "130405",
								"name": "Phnum Tbaeng Pir"
								,"villages": [
									
								]
							}
							,{
								"code": "130406",
								"name": "Srayang"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1305"
						,"name":  "Rovieng"
						,"communes": [
							{
								"code": "130501",
								"name": "Robieb"
								,"villages": [
									
								]
							}
							,{
								"code": "130502",
								"name": "Reaksmei"
								,"villages": [
									
								]
							}
							,{
								"code": "130503",
								"name": "Rohas"
								,"villages": [
									
								]
							}
							,{
								"code": "130504",
								"name": "Rung Raeung"
								,"villages": [
									
								]
							}
							,{
								"code": "130505",
								"name": "Rik Reay"
								,"villages": [
									
								]
							}
							,{
								"code": "130506",
								"name": "Ruos Rean"
								,"villages": [
									
								]
							}
							,{
								"code": "130507",
								"name": "Rotanak"
								,"villages": [
									
								]
							}
							,{
								"code": "130508",
								"name": "Rieb Roy"
								,"villages": [
									
								]
							}
							,{
								"code": "130509",
								"name": "Raksa"
								,"villages": [
									
								]
							}
							,{
								"code": "130510",
								"name": "Rumdaoh"
								,"villages": [
									
								]
							}
							,{
								"code": "130511",
								"name": "Romtom"
								,"villages": [
									
								]
							}
							,{
								"code": "130512",
								"name": "Romoniy"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1306"
						,"name":  "Sangkom Thmei"
						,"communes": [
							{
								"code": "130601",
								"name": "Chamraeun"
								,"villages": [
									
								]
							}
							,{
								"code": "130602",
								"name": "Ro'ang"
								,"villages": [
									
								]
							}
							,{
								"code": "130603",
								"name": "Phnum Tbaeng Muoy"
								,"villages": [
									
								]
							}
							,{
								"code": "130604",
								"name": "Sdau"
								,"villages": [
									
								]
							}
							,{
								"code": "130605",
								"name": "Ronak Ser"
								,"villages": [
									
								]
							}
							,{
								"code": "130703",
								"name": "Chhean Mukh"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1307"
						,"name":  "Tbaeng Mean Chey"
						,"communes": [
							{
								"code": "130704",
								"name": "Pou"
								,"villages": [
									
								]
							}
							,{
								"code": "130705",
								"name": "Prame"
								,"villages": [
									
								]
							}
							,{
								"code": "130706",
								"name": "Preah Khleang"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1308"
						,"name":  "Krong Preah Vihear"
						,"communes": [
							{
								"code": "130801",
								"name": "Kampong Pranak"
								,"villages": [
									
								]
							}
							,{
								"code": "130802",
								"name": "Pal Hal"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "15"
				,"name": "Pursat"
				,"districts":[
					{
						"code":  "1501"
						,"name":  "Bakan"
						,"communes": [
							{
								"code": "150101",
								"name": "Boeng Bat Kandal"
								,"villages": [
									
								]
							}
							,{
								"code": "150102",
								"name": "Boeng Khnar"
								,"villages": [
									
								]
							}
							,{
								"code": "150103",
								"name": "Khnar Totueng"
								,"villages": [
									
								]
							}
							,{
								"code": "150104",
								"name": "Me Tuek"
								,"villages": [
									
								]
							}
							,{
								"code": "150105",
								"name": "Ou Ta Paong"
								,"villages": [
									
								]
							}
							,{
								"code": "150106",
								"name": "Rumlech"
								,"villages": [
									
								]
							}
							,{
								"code": "150107",
								"name": "Snam Preah"
								,"villages": [
									
								]
							}
							,{
								"code": "150108",
								"name": "Svay Doun Kaev"
								,"villages": [
									
								]
							}
							,{
								"code": "150109",
								"name": "Ta Lou"
								,"villages": [
									
								]
							}
							,{
								"code": "150110",
								"name": "Trapeang chorng"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1502"
						,"name":  "Kandieng"
						,"communes": [
							{
								"code": "150201",
								"name": "Anlong Vil"
								,"villages": [
									
								]
							}
							,{
								"code": "150203",
								"name": "Kandieng"
								,"villages": [
									
								]
							}
							,{
								"code": "150204",
								"name": "Kanhchor"
								,"villages": [
									
								]
							}
							,{
								"code": "150205",
								"name": "Reang Til"
								,"villages": [
									
								]
							}
							,{
								"code": "150206",
								"name": "Srae Sdok"
								,"villages": [
									
								]
							}
							,{
								"code": "150207",
								"name": "Svay Luong"
								,"villages": [
									
								]
							}
							,{
								"code": "150208",
								"name": "Sya"
								,"villages": [
									
								]
							}
							,{
								"code": "150209",
								"name": "Veal"
								,"villages": [
									
								]
							}
							,{
								"code": "150210",
								"name": "Kaoh Chum"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1505"
						,"name":  "Sampov Meas"
						,"communes": [
							{
								"code": "150501",
								"name": "Chamraeun Phal"
								,"villages": [
									
								]
							}
							,{
								"code": "150503",
								"name": "Lolork Sa"
								,"villages": [
									
								]
							}
							,{
								"code": "150504",
								"name": "Phteah Prey"
								,"villages": [
									
								]
							}
							,{
								"code": "150505",
								"name": "Prey Nhi"
								,"villages": [
									
								]
							}
							,{
								"code": "150506",
								"name": "Roleab"
								,"villages": [
									
								]
							}
							,{
								"code": "150507",
								"name": "Svay At"
								,"villages": [
									
								]
							}
							,{
								"code": "150508",
								"name": "Banteay Dei"
								,"villages": [
									
								]
							}
						]
					}
				]
			}
			,{
				"code": "16"
				,"name": "Ratanak Kiri"
				,"districts":[
					{
						"code":  "1602"
						,"name":  "Ban Lung"
						,"communes": [
							{
								"code": "160201",
								"name": "Kachanh"
								,"villages": [
									
								]
							}
							,{
								"code": "160202",
								"name": "Labansiek"
								,"villages": [
									
								]
							}
							,{
								"code": "160203",
								"name": "Yeak Laom"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1604"
						,"name":  "Koun Mom"
						,"communes": [
							{
								"code": "160401",
								"name": "Serei Mongkol"
								,"villages": [
									
								]
							}
							,{
								"code": "160402",
								"name": "Srae Angkrorng"
								,"villages": [
									
								]
							}
							,{
								"code": "160403",
								"name": "Taa Ang"
								,"villages": [
									
								]
							}
							,{
								"code": "160404",
								"name": "Toeun"
								,"villages": [
									
								]
							}
							,{
								"code": "160405",
								"name": "Trapeang Chres"
								,"villages": [
									
								]
							}
							,{
								"code": "160406",
								"name": "Trapeang Kraham"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1605"
						,"name":  "Lumphat"
						,"communes": [
							{
								"code": "160501",
								"name": "Chey Otdam"
								,"villages": [
									
								]
							}
							,{
								"code": "160502",
								"name": "Ka Laeng"
								,"villages": [
									
								]
							}
							,{
								"code": "160503",
								"name": "Lbang Muoy"
								,"villages": [
									
								]
							}
							,{
								"code": "160504",
								"name": "Lbang Pir"
								,"villages": [
									
								]
							}
							,{
								"code": "160505",
								"name": "Pa Tang"
								,"villages": [
									
								]
							}
							,{
								"code": "160506",
								"name": "Seda"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1606"
						,"name":  "Ou Chum"
						,"communes": [
							{
								"code": "160601",
								"name": "Char Ung"
							}
							,{
								"code": "160602",
								"name": "Pouy"
								,"villages": [
									
								]
							}
							,{
								"code": "160603",
								"name": "Aekakpheap"
								,"villages": [
									
								]
							}
							,{
								"code": "160604",
								"name": "Kalai"
								,"villages": [
									
								]
							}
							,{
								"code": "160605",
								"name": "Ou Chum"
								,"villages": [
									
								]
							}
							,{
								"code": "160606",
								"name": "Sameakki"
								,"villages": [
									
								]
							}
							,{
								"code": "160607",
								"name": "L'ak"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1608"
						,"name":  "Ta Veaeng"
						,"communes": [
							{
								"code": "160801",
								"name": "Ta Veaeng Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "160802",
								"name": "Ta Veaeng Kraom"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1609"
						,"name":  "Veun Sai"
						,"communes": [
							{
								"code": "160901",
								"name": "Pong"
								,"villages": [
									
								]
							}
							,{
								"code": "160903",
								"name": "Hat Pak"
								,"villages": [
									
								]
							}
							,{
								"code": "160904",
								"name": "Ka Choun"
								,"villages": [
									
								]
							}
							,{
								"code": "160905",
								"name": "Kaoh Pang"
								,"villages": [
									
								]
							}
							,{
								"code": "160906",
								"name": "Kaoh Peak"
								,"villages": [
									
								]
							}
							,{
								"code": "160907",
								"name": "Kok Lak"
								,"villages": [
									
								]
							}
							,{
								"code": "160909",
								"name": "Phnum Kok"
								,"villages": [
									
								]
							}
						]
					}
				]
			}
			,{
				"code": "17"
				,"name": "Siem Reap"
				,"districts":[
					{
						"code":  "1701"
						,"name":  "Angkor Chum"
						,"communes": [
							{
								"code": "170101",
								"name": "Char Chhuk"
								,"villages": [
									
								]
							}
							,{
								"code": "170102",
								"name": "Doun Peaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "170103",
								"name": "Kouk Doung"
								,"villages": [
									
								]
							}
							,{
								"code": "170104",
								"name": "Koul"
								,"villages": [
									
								]
							}
							,{
								"code": "170105",
								"name": "Norkor Pheas"
								,"villages": [
									
								]
							}
							,{
								"code": "170106",
								"name": "Srae Kvav"
								,"villages": [
									
								]
							}
							,{
								"code": "170107",
								"name": "Ta Saom"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1702"
						,"name":  "Angkor Thum"
						,"communes": [
							{
								"code": "170201",
								"name": "Chob Ta Trav"
								,"villages": [
									
								]
							}
							,{
								"code": "170202",
								"name": "Leang Dai"
								,"villages": [
									
								]
							}
							,{
								"code": "170203",
								"name": "Peak Snaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "170204",
								"name": "Svay Chek"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1703"
						,"name":  "Banteay Srei"
						,"communes": [
							{
								"code": "170301",
								"name": "Khnar Sanday"
								,"villages": [
									
								]
							}
							,{
								"code": "170302",
								"name": "Khun Ream"
								,"villages": [
									
								]
							}
							,{
								"code": "170303",
								"name": "Preah Dak"
								,"villages": [
									
								]
							}
							,{
								"code": "170304",
								"name": "Rumchek"
								,"villages": [
									
								]
							}
							,{
								"code": "170305",
								"name": "Run Ta Aek"
								,"villages": [
									
								]
							}
							,{
								"code": "170306",
								"name": "Tbaeng"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1704"
						,"name":  "Chi Kraeng"
						,"communes": [
							{
								"code": "170401",
								"name": "Anlong Samnar"
								,"villages": [
									
								]
							}
							,{
								"code": "170402",
								"name": "Chi Kraeng"
								,"villages": [
									
								]
							}
							,{
								"code": "170403",
								"name": "Kampong Kdei"
								,"villages": [
									
								]
							}
							,{
								"code": "170404",
								"name": "Khvav"
								,"villages": [
									
								]
							}
							,{
								"code": "170405",
								"name": "Kouk Thlok Kraom"
								,"villages": [
									
								]
							}
							,{
								"code": "170406",
								"name": "Kouk Thlok Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "170407",
								"name": "Lveaeng Ruessei"
								,"villages": [
									
								]
							}
							,{
								"code": "170408",
								"name": "Pongro Kraom"
								,"villages": [
									
								]
							}
							,{
								"code": "170409",
								"name": "Pongro Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "170410",
								"name": "Ruessei Lok"
								,"villages": [
									
								]
							}
							,{
								"code": "170411",
								"name": "Sangvaeuy"
								,"villages": [
									
								]
							}
							,{
								"code": "170412",
								"name": "Spean Thnot"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1706"
						,"name":  "Kralanh"
						,"communes": [
							{
								"code": "170601",
								"name": "Chanleas Dai"
								,"villages": [
									
								]
							}
							,{
								"code": "170602",
								"name": "Kampong Thkov"
								,"villages": [
									
								]
							}
							,{
								"code": "170603",
								"name": "Kralanh"
								,"villages": [
									
								]
							}
							,{
								"code": "170604",
								"name": "Krouch Kor"
								,"villages": [
									
								]
							}
							,{
								"code": "170605",
								"name": "Roung Kou"
								,"villages": [
									
								]
							}
							,{
								"code": "170606",
								"name": "Sambuor"
								,"villages": [
									
								]
							}
							,{
								"code": "170607",
								"name": "Saen Sokh"
								,"villages": [
									
								]
							}
							,{
								"code": "170608",
								"name": "Snuol"
								,"villages": [
									
								]
							}
							,{
								"code": "170609",
								"name": "Sranal"
								,"villages": [
									
								]
							}
							,{
								"code": "170610",
								"name": "Ta An"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1707"
						,"name":  "Puok"
						,"communes": [
							{
								"code": "170701",
								"name": "Sasar Sdam"
								,"villages": [
									
								]
							}
							,{
								"code": "170702",
								"name": "Doun Kaev"
								,"villages": [
									
								]
							}
							,{
								"code": "170703",
								"name": "Kdei Run"
								,"villages": [
									
								]
							}
							,{
								"code": "170704",
								"name": "Kaev Poar"
								,"villages": [
									
								]
							}
							,{
								"code": "170705",
								"name": "Khnat"
								,"villages": [
									
								]
							}
							,{
								"code": "170707",
								"name": "Lvea"
								,"villages": [
									
								]
							}
							,{
								"code": "170708",
								"name": "Mukh Paen"
								,"villages": [
									
								]
							}
							,{
								"code": "170709",
								"name": "Pou Treay"
								,"villages": [
									
								]
							}
							,{
								"code": "170710",
								"name": "Puok"
								,"villages": [
									
								]
							}
							,{
								"code": "170711",
								"name": "Prey Chruk"
								,"villages": [
									
								]
							}
							,{
								"code": "170712",
								"name": "Reul"
								,"villages": [
									
								]
							}
							,{
								"code": "170713",
								"name": "Samraong Yea"
								,"villages": [
									
								]
							}
							,{
								"code": "170715",
								"name": "Trei Nhoar"
								,"villages": [
									
								]
							}
							,{
								"code": "170716",
								"name": "Yeang"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1709"
						,"name":  "Prasat Bakong"
						,"communes": [
							{
								"code": "170902",
								"name": "Bakong"
								,"villages": [
									
								]
							}
							,{
								"code": "170903",
								"name": "Ballangk"
								,"villages": [
									
								]
							}
							,{
								"code": "170904",
								"name": "Kampong Phluk"
								,"villages": [
									
								]
							}
							,{
								"code": "170905",
								"name": "Kantreang"
								,"villages": [
									
								]
							}
							,{
								"code": "170906",
								"name": "Kandaek"
								,"villages": [
									
								]
							}
							,{
								"code": "170907",
								"name": "Mean Chey"
								,"villages": [
									
								]
							}
							,{
								"code": "170908",
								"name": "Roluos"
								,"villages": [
									
								]
							}
							,{
								"code": "170909",
								"name": "Trapeang Thum"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1710"
						,"name":  "Siem Reab"
						,"communes": [
							{
								"code": "171001",
								"name": "Sla Kram"
								,"villages": [
									
								]
							}
							,{
								"code": "171002",
								"name": "Svay Dankum"
								,"villages": [
									
								]
							}
							,{
								"code": "171003",
								"name": "Kouk Chak"
								,"villages": [
									
								]
							}
							,{
								"code": "171004",
								"name": "Sala Kamraeuk"
								,"villages": [
									
								]
							}
							,{
								"code": "171005",
								"name": "Nokor Thum"
								,"villages": [
									
								]
							}
							,{
								"code": "171006",
								"name": "Chreav"
								,"villages": [
									
								]
							}
							,{
								"code": "171007",
								"name": "Chong Knies"
								,"villages": [
									
								]
							}
							,{
								"code": "171008",
								"name": "Sambuor"
								,"villages": [
									
								]
							}
							,{
								"code": "171009",
								"name": "Siem Reab"
								,"villages": [
									
								]
							}
							,{
								"code": "171010",
								"name": "Srangae"
								,"villages": [
									
								]
							}
							,{
								"code": "171011",
								"name": "Ampil"
								,"villages": [
									
								]
							}
							,{
								"code": "171012",
								"name": "Krabei Riel"
								,"villages": [
									
								]
							}
							,{
								"code": "171013",
								"name": "Tuek Vil"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1711"
						,"name":  "Soutr Nikom"
						,"communes": [
							{
								"code": "171101",
								"name": "Chan Sar"
								,"villages": [
									
								]
							}
							,{
								"code": "171102",
								"name": "Dam Daek"
								,"villages": [
									
								]
							}
							,{
								"code": "171103",
								"name": "Dan Run"
								,"villages": [
									
								]
							}
							,{
								"code": "171104",
								"name": "Kampong Khleang"
								,"villages": [
									
								]
							}
							,{
								"code": "171105",
								"name": "Kien Sangkae"
								,"villages": [
									
								]
							}
							,{
								"code": "171106",
								"name": "Khchas"
								,"villages": [
									
								]
							}
							,{
								"code": "171107",
								"name": "Khnar Pou"
								,"villages": [
									
								]
							}
							,{
								"code": "171108",
								"name": "Popel"
								,"villages": [
									
								]
							}
							,{
								"code": "171109",
								"name": "Samraong"
								,"villages": [
									
								]
							}
							,{
								"code": "171110",
								"name": "Ta Yaek"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1712"
						,"name":  "Srei Snam"
						,"communes": [
							{
								"code": "171201",
								"name": "Chrouy Neang Nguon"
								,"villages": [
									
								]
							}
							,{
								"code": "171202",
								"name": "Klang Hay"
								,"villages": [
									
								]
							}
							,{
								"code": "171203",
								"name": "Tram Sasar"
								,"villages": [
									
								]
							}
							,{
								"code": "171204",
								"name": "Moung"
								,"villages": [
									
								]
							}
							,{
								"code": "171205",
								"name": "Prei"
								,"villages": [
									
								]
							}
							,{
								"code": "171206",
								"name": "Slaeng Spean"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1713"
						,"name":  "Svay Leu"
						,"communes": [
							{
								"code": "171301",
								"name": "Boeng Mealea"
								,"villages": [
									
								]
							}
							,{
								"code": "171302",
								"name": "Kantuot"
								,"villages": [
									
								]
							}
							,{
								"code": "171303",
								"name": "Khnang Phnum"
								,"villages": [
									
								]
							}
							,{
								"code": "171304",
								"name": "Svay Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "171305",
								"name": "Ta Siem"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1714"
						,"name":  "Varin"
						,"communes": [
							{
								"code": "171401",
								"name": "Prasat"
								,"villages": [
									
								]
							}
							,{
								"code": "171402",
								"name": "Lvea Krang"
								,"villages": [
									
								]
							}
							,{
								"code": "171403",
								"name": "Srae Nouy"
								,"villages": [
									
								]
								,"villages": [
									
								]
							}
							,{
								"code": "171404",
								"name": "Svay Sa"
								,"villages": [
									
								]
							}
							,{
								"code": "171405",
								"name": "Varin"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "18"
				,"name": "Sihanoukville"
				,"districts":[
					{
						"code":  "1801"
						,"name":  "Mittapheap"
						,"communes": [
							{
								"code": "180101",
								"name": "Sangkat Muoy"
								,"villages": [
									
								]
							}
							,{
								"code": "180102",
								"name": "Sangkat Pir"
								,"villages": [
									
								]
							}
							,{
								"code": "180103",
								"name": "Sangkat Bei"
								,"villages": [
									
								]
							}
							,{
								"code": "180104",
								"name": "Sangkat Buon"
								,"villages": [
									
								]
							}
							,{
								"code": "180105",
								"name": "Kaoh Rung"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1802"
						,"name":  "Prey Nob"
						,"communes": [
							{
								"code": "180201",
								"name": "Andoung Thma"
								,"villages": [
									
								]
							}
							,{
								"code": "180202",
								"name": "Boeng Ta Prum"
								,"villages": [
									
								]
							}
							,{
								"code": "180203",
								"name": "Bet Trang"
								,"villages": [
									
								]
							}
							,{
								"code": "180204",
								"name": "Cheung Kou"
								,"villages": [
									
								]
							}
							,{
								"code": "180205",
								"name": "Ou Chrov"
								,"villages": [
									
								]
							}
							,{
								"code": "180206",
								"name": "Ou Oknha Heng"
								,"villages": [
									
								]
							}
							,{
								"code": "180207",
								"name": "Prey Nob"
								,"villages": [
									
								]
							}
							,{
								"code": "180208",
								"name": "Ream"
								,"villages": [
									
								]
							}
							,{
								"code": "180209",
								"name": "Sameakki"
								,"villages": [
									
								]
							}
							,{
								"code": "180210",
								"name": "Samrong"
								,"villages": [
									
								]
							}
							,{
								"code": "180211",
								"name": "Tuek L'ak"
								,"villages": [
									
								]
							}
							,{
								"code": "180212",
								"name": "Tuek Thla"
								,"villages": [
									
								]
							}
							,{
								"code": "180213",
								"name": "Tuol Totueng"
								,"villages": [
									
								]
							}
							,{
								"code": "180214",
								"name": "Veal Renh"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1803"
						,"name":  "Stueng Hav"
						,"communes": [
							{
								"code": "180301",
								"name": "Kampenh"
								,"villages": [
									
								]
							}
							,{
								"code": "180302",
								"name": "Ou Treh"
								,"villages": [
									
								]
							}
							,{
								"code": "180303",
								"name": "Tumnob Rolok"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1804"
						,"name":  "Kampong Seila"
						,"communes": [
							{
								"code": "180401",
								"name": "Chamkar Luong"
								,"villages": [
									
								]
							}
							,{
								"code": "180402",
								"name": "Kampong Seila"
								,"villages": [
									
								]
							}
							,{
								"code": "180403",
								"name": "Ou Bak Roteh"
								,"villages": [
									
								]
							}
							,{
								"code": "180404",
								"name": "Stueng Chhay"
								,"villages": [
									
								]
							}
						]
					}
				]
			}
			,{
				"code": "19"
				,"name": "Stung Treng"
				,"districts":[
					{
						"code":  "1901"
						,"name":  "Sesan"
						,"communes": [
							{
								"code": "190101",
								"name": "Kamphun"
								,"villages": [
									
								]
							}
							,{
								"code": "190102",
								"name": "Kbal Romeas"
								,"villages": [
									
								]
							}
							,{
								"code": "190103",
								"name": "Phluk"
								,"villages": [
									
								]
							}
							,{
								"code": "190104",
								"name": "Samkuoy"
								,"villages": [
									
								]
							}
							,{
								"code": "190105",
								"name": "Sdau"
								,"villages": [
									
								]
							}
							,{
								"code": "190106",
								"name": "Srae Kor"
								,"villages": [
									
								]
							}
							,{
								"code": "190107",
								"name": "Ta Lat"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1902"
						,"name":  "Siem Bouk"
						,"communes": [
							{
								"code": "190201",
								"name": "Kaoh Preah"
								,"villages": [
									
								]
							}
							,{
								"code": "190202",
								"name": "Kaoh Sampeay"
								,"villages": [
									
								]
							}
							,{
								"code": "190203",
								"name": "Kaoh Sralay"
								,"villages": [
									
								]
							}
							,{
								"code": "190204",
								"name": "Ou Mreah"
								,"villages": [
									
								]
							}
							,{
								"code": "190205",
								"name": "Ou Ruessei Kandal"
								,"villages": [
									
								]
							}
							,{
								"code": "190206",
								"name": "Siem Bouk"
								,"villages": [
									
								]
							}
							,{
								"code": "190207",
								"name": "Srae Krasang"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1903"
						,"name":  "Siem Pang"
						,"communes": [
							{
								"code": "190301",
								"name": "Preaek Meas"
								,"villages": [
									
								]
							}
							,{
								"code": "190302",
								"name": "Sekong"
								,"villages": [
									
								]
							}
							,{
								"code": "190303",
								"name": "Santepheap"
								,"villages": [
									
								]
							}
							,{
								"code": "190304",
								"name": "Srae Sambour"
								,"villages": [
									
								]
							}
							,{
								"code": "190305",
								"name": "Tma Kaev"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1904"
						,"name":  "Stueng Traeng"
						,"communes": [
							{
								"code": "190401",
								"name": "Stueng Traeng"
								,"villages": [
									
								]
							}
							,{
								"code": "190402",
								"name": "Srah Ruessei"
								,"villages": [
									
								]
							}
							,{
								"code": "190403",
								"name": "Preah Bat"
								,"villages": [
									
								]
							}
							,{
								"code": "190404",
								"name": "Sameakki"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "1905"
						,"name":  "Thala Barivat"
						,"communes": [
							{
								"code": "190501",
								"name": "Anlong Phe"
								,"villages": [
									
								]
							}
							,{
								"code": "190502",
								"name": "Chamkar Leu"
								,"villages": [
									
								]
							}
							,{
								"code": "190503",
								"name": "Kang Cham"
								,"villages": [
									
								]
							}
							,{
								"code": "190504",
								"name": "Kaoh Snaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "190505",
								"name": "Anlong Chrey"
								,"villages": [
									
								]
							}
							,{
								"code": "190506",
								"name": "Ou Rey"
								,"villages": [
									
								]
							}
							,{
								"code": "190507",
								"name": "Ou Svay"
								,"villages": [
									
								]
							}
							,{
								"code": "190508",
								"name": "Preah Rumkel"
								,"villages": [
									
								]
							}
							,{
								"code": "190509",
								"name": "Sam'ang"
								,"villages": [
									
								]
							}
							,{
								"code": "190510",
								"name": "Srae Ruessei"
								,"villages": [
									
								]
							}
							,{
								"code": "190511",
								"name": "Thalabarivat"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "21"
				,"name": "Takeo"
				,"districts":[
					{
						"code":  "2101"
						,"name":  "Angkor Borei"
						,"communes": [
							{
								"code": "210101",
								"name": "Angkor Borei"
								,"villages": [
									
								]
							}
							,{
								"code": "210102",
								"name": "Ba Srae"
								,"villages": [
									
								]
							}
							,{
								"code": "210103",
								"name": "Kouk Thlok"
								,"villages": [
									
								]
							}
							,{
								"code": "210104",
								"name": "Ponley"
								,"villages": [
									
								]
							}
							,{
								"code": "210105",
								"name": "Preaek Phtoul"
								,"villages": [
									
								]
							}
							,{
								"code": "210106",
								"name": "Prey Phkoam"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2102"
						,"name":  "Bati"
						,"communes": [
							{
								"code": "210201",
								"name": "Chambak"
								,"villages": [
									
								]
							}
							,{
								"code": "210202",
								"name": "Champei"
								,"villages": [
									
								]
							}
							,{
								"code": "210203",
								"name": "Doung"
								,"villages": [
									
								]
							}
							,{
								"code": "210204",
								"name": "Kandoeng"
								,"villages": [
									
								]
							}
							,{
								"code": "210205",
								"name": "Komar Reachea"
								,"villages": [
									
								]
							}
							,{
								"code": "210206",
								"name": "Krang Leav"
								,"villages": [
									
								]
							}
							,{
								"code": "210207",
								"name": "Krang Thnong"
								,"villages": [
									
								]
							}
							,{
								"code": "210208",
								"name": "Lumpong"
								,"villages": [
									
								]
							}
							,{
								"code": "210209",
								"name": "Pea Ream"
								,"villages": [
									
								]
							}
							,{
								"code": "210210",
								"name": "Pot Sar"
								,"villages": [
									
								]
							}
							,{
								"code": "210211",
								"name": "Souphi"
								,"villages": [
									
								]
							}
							,{
								"code": "210212",
								"name": "Tang Doung"
								,"villages": [
									
								]
							}
							,{
								"code": "210213",
								"name": "Tnaot"
								,"villages": [
									
								]
							}
							,{
								"code": "210214",
								"name": "Trapeang Krasang"
								,"villages": [
									
								]
							}
							,{
								"code": "210215",
								"name": "Trapeang Sab"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2104"
						,"name":  "Kiri Vong"
						,"communes": [
							{
								"code": "210402",
								"name": "Preah Bat Choan Chum"
								,"villages": [
									
								]
							}
							,{
								"code": "210403",
								"name": "Kamnab"
								,"villages": [
									
								]
							}
							,{
								"code": "210404",
								"name": "Kampeaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "210405",
								"name": "Kiri Chong Kaoh"
								,"villages": [
									
								]
							}
							,{
								"code": "210406",
								"name": "Kouk Prech"
								,"villages": [
									
								]
							}
							,{
								"code": "210407",
								"name": "Phnum Den"
								,"villages": [
									
								]
							}
							,{
								"code": "210408",
								"name": "Prey Ampok"
								,"villages": [
									
								]
							}
							,{
								"code": "210409",
								"name": "Prey Rumdeng"
								,"villages": [
									
								]
							}
							,{
								"code": "210410",
								"name": "Ream Andaeuk"
								,"villages": [
									
								]
							}
							,{
								"code": "210411",
								"name": "Saom"
								,"villages": [
									
								]
							}
							,{
								"code": "210412",
								"name": "Ta Ou"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2106"
						,"name":  "Prey Kabbas"
						,"communes": [
								{
								"code": "210601",
								"name": "Angkanh"
								,"villages": [
									
								]
							}
							,{
								"code": "210602",
								"name": "Ban Kam"
								,"villages": [
									
								]
							}
							,{
								"code": "210603",
								"name": "Champa"
								,"villages": [
									
								]
							}
							,{
								"code": "210604",
								"name": "Char"
								,"villages": [
									
								]
							}
							,{
								"code": "210605",
								"name": "Kampeaeng"
								,"villages": [
									
								]
							}
							,{
								"code": "210606",
								"name": "Kampong Reab"
								,"villages": [
									
								]
							}
							,{
								"code": "210607",
								"name": "Kdanh"
								,"villages": [
									
								]
							}
							,{
								"code": "210608",
								"name": "Pou Rumchak"
								,"villages": [
									
								]
							}
							,{
								"code": "210609",
								"name": "Prey Kabbas"
								,"villages": [
									
								]
							}
							,{
								"code": "210610",
								"name": "Prey Lvea"
								,"villages": [
									
								]
							}
							,{
								"code": "210611",
								"name": "Prey Phdau"
								,"villages": [
									
								]
							}
							,{
								"code": "210612",
								"name": "Snao"
								,"villages": [
									
								]
							}
							,{
								"code": "210613",
								"name": "Tang Yab"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2107"
						,"name":  "Samraong"
						,"communes": [
							{
								"code": "210701",
								"name": "Boeng Tranh Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "210702",
								"name": "Boeng Tranh Khang Tboung"
								,"villages": [
									
								]
							}
							,{
								"code": "210703",
								"name": "Cheung Kuon"
								,"villages": [
									
								]
							}
							,{
								"code": "210704",
								"name": "Chumreah Pen"
								,"villages": [
									
								]
							}
							,{
								"code": "210705",
								"name": "Khvav"
								,"villages": [
									
								]
							}
							,{
								"code": "210706",
								"name": "Lumchang"
								,"villages": [
									
								]
							}
							,{
								"code": "210707",
								"name": "Rovieng"
								,"villages": [
									
								]
							}
							,{
								"code": "210708",
								"name": "Samraong"
								,"villages": [
									
								]
							}
							,{
								"code": "210709",
								"name": "Soengh"
								,"villages": [
									
								]
							}
							,{
								"code": "210710",
								"name": "Sla"
								,"villages": [
									
								]
							}
							,{
								"code": "210711",
								"name": "Trea"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2108"
						,"name":  "Doun Kaev"
						,"communes": [
							{
								"code": "210801",
								"name": "Baray"
								,"villages": [
									
								]
							}
							,{
								"code": "210802",
								"name": "Roka Khnong"
								,"villages": [
									
								]
							}
							,{
								"code": "210803",
								"name": "Roka Krau"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2109"
						,"name":  "Tram Kak"
						,"communes": [
							{
								"code": "210901",
								"name": "Ang Ta Saom"
								,"villages": [
									
								]
							}
							,{
								"code": "210902",
								"name": "Cheang Tong"
								,"villages": [
									
								]
							}
							,{
								"code": "210903",
								"name": "Kus"
								,"villages": [
									
								]
							}
							,{
								"code": "210904",
								"name": "Leay Bour"
								,"villages": [
									
								]
							}
							,{
								"code": "210905",
								"name": "Nhaeng Nhang"
								,"villages": [
									
								]
							}
							,{
								"code": "210906",
								"name": "Ou Saray"
								,"villages": [
									
								]
							}
							,{
								"code": "210907",
								"name": "Trapeang Kranhung"
								,"villages": [
									
								]
							}
							,{
								"code": "210908",
								"name": "Otdam Souriya"
								,"villages": [
									
								]
							}
							,{
								"code": "210909",
								"name": "Popel"
								,"villages": [
									
								]
							}
							,{
								"code": "210910",
								"name": "Samraong"
								,"villages": [
									
								]
							}
							,{
								"code": "210911",
								"name": "Srae Ronoung"
								,"villages": [
									
								]
							}
							,{
								"code": "210912",
								"name": "Ta Phem"
								,"villages": [
									
								]
							}
							,{
								"code": "210913",
								"name": "Tram Kak"
								,"villages": [
									
								]
							}
							,{
								"code": "210914",
								"name": "Trapeang Thum Khang Cheung"
								,"villages": [
									
								]
							}
							,{
								"code": "210915",
								"name": "Trapeang Thum Khang Tboung"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2110"
						,"name":  "Treang"
						,"communes": [
							{
								"code": "211001",
								"name": "Angkanh"
								,"villages": [
									
								]
							}
							,{
								"code": "211002",
								"name": "Angk Khnaor"
								,"villages": [
									
								]
							}
							,{
								"code": "211003",
								"name": "Chi Khnar"
								,"villages": [
									
								]
							}
							,{
								"code": "211004",
								"name": "Khvav"
								,"villages": [
									
								]
							}
							,{
								"code": "211005",
								"name": "Prambei Mom"
								,"villages": [
									
								]
							}
							,{
								"code": "211006",
								"name": "Angk Kaev"
								,"villages": [
									
								]
							}
							,{
								"code": "211007",
								"name": "Prey Sloek"
								,"villages": [
									
								]
							}
							,{
								"code": "211008",
								"name": "Roneam"
								,"villages": [
									
								]
							}
							,{
								"code": "211009",
								"name": "Sambuor"
								,"villages": [
									
								]
							}
							,{
								"code": "211010",
								"name": "Sanlong"
								,"villages": [
									
								]
							}
							,{
								"code": "211012",
								"name": "Srangae"
								,"villages": [
									
								]
							}
							,{
								"code": "211013",
								"name": "Thlaok"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
			,{
				"code": "22"
				,"name": "Oddar Meanchey"
				,"districts":[
					{
						"code":  "2202"
						,"name":  "Banteay Ampil"
						,"communes": [
							{
								"code": "220201",
								"name": "Ampil"
								,"villages": [
									
								]
							}
							,{
								"code": "220202",
								"name": "Beng"
								,"villages": [
									
								]
							}
							,{
								"code": "220203",
								"name": "Kouk Khpos"
								,"villages": [
									
								]
							}
							,{
								"code": "220204",
								"name": "Kouk Mon"
								,"villages": [
									
								]
							}
							,{
								"code": "220205",
								"name": "Kok Ovloak"
								,"villages": [
									
								]
							}
							,{
								"code": "220206",
								"name": "Chhouk"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2203"
						,"name":  "Chong Kal"
						,"communes": [
							{
								"code": "220301",
								"name": "Cheung Tien"
								,"villages": [
									
								]
							}
							,{
								"code": "220302",
								"name": "Chong Kal"
								,"villages": [
									
								]
							}
							,{
								"code": "220303",
								"name": "Krasang"
								,"villages": [
									
								]
							}
							,{
								"code": "220304",
								"name": "Pongro"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2204"
						,"name":  "Samraong"
						,"communes": [
							{
								"code": "220401",
								"name": "Bansay Reak"
								,"villages": [
									
								]
							}
							,{
								"code": "220402",
								"name": "Bos Sbov"
								,"villages": [
									
								]
							}
							,{
								"code": "220403",
								"name": "Koun Kriel"
								,"villages": [
									
								]
							}
							,{
								"code": "220404",
								"name": "Samraong"
								,"villages": [
									
								]
							}
							,{
								"code": "220405",
								"name": "Ou Smach"
								,"villages": [
									
								]
							}
						]
					}
				]
			}
			,{
				"code": "23"
				,"name": "Kep"
				,"districts":[
					{
						"code":  "2301"
						,"name":  "Damnak Chang'aeur"
						,"communes": [
							{
								"code": "230101",
								"name": "Sangkat Angkaol"
								,"villages": [
									
								]
							}
							,{
								"code": "230102",
								"name": "Sangkat Ou Krasar"
								,"villages": [
									
								]
							}
							,{
								"code": "230103",
								"name": "Pong Tuek"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2302"
						,"name":  "Kaeb"
						,"communes": [
							{
								"code": "230201",
								"name": "Kaeb"
								,"villages": [
									
								]
							}
							,{
								"code": "230202",
								"name": "Prey Thum"
								,"villages": [
									
								]
							}
						]
					}
				]
			}
			,{
				"code": "24"
				,"name": "Pailin"
				,"districts":[
					{
						"code":  "2401"
						,"name":  "Pailin"
						,"communes": [
							{
								"code": "240101",
								"name": "Sangkat Pailin"
								,"villages": [
									
								]
							}
							,{
								"code": "240102",
								"name": "Ou Ta Vau"
								,"villages": [
									
								]
							}
							,{
								"code": "240103",
								"name": "Tuol Lvea"
								,"villages": [
									
								]
							}
							,{
								"code": "240104",
								"name": "Bar Yakha"
								,"villages": [
									
								]
							}
						]
					}
					,{
						"code":  "2402"
						,"name":  "Sala Krau"
						,"communes": [
							{
								"code": "240201",
								"name": "Sala Krau"
								,"villages": [
									
								]
							}
							,{
								"code": "240202",
								"name": "Stueng Trang"
								,"villages": [
									
								]
							}
							,{
								"code": "240203",
								"name": "Stueng Kach"
								,"villages": [
									
								]
							}
							,{
								"code": "240204",
								"name": "Ou Andoung"
								,"villages": [
									
								]
							}
						]
					}

				]
			}
		];
	
	// --------------------------------------------------------------------------
	// Init method
	// --------------------------------------------------------------------------
	
	me.initialSetup = function()
	{
		me.villageByHeathCenterOptionTag.prop("checked", true );
		Util.disableTag( me.villageByHeathCenterTbTag, false );
		Util.disableTag( me.deProvinceListTag, true );
		Util.disableTag( me.deDistritListTag, true );
		Util.disableTag( me.deCommuneListTag, true );
		Util.disableTag( me.deVillageListTag, true );
				
		me.loadProvinces();
		
		me.FormPopupSetup();
		me.setUp_Events();
	};
	
	
	// --------------------------------------------------------------------------
	// Load Organisation Unit in levels
	// --------------------------------------------------------------------------
	
	me.setInputTags = function( inputCodeTag, inputGPSTag )
	{
		me.inputCodeTag = inputCodeTag;
		me.inputGPSTag = inputGPSTag;
	};
	
	me.FormPopupSetup = function()
	{
		// -- Set up the form -------------------
		me.dialogFormTag.dialog({
		  title: "Select Village"
		  ,autoOpen: false,
		  //dialogClass: "noTitleStuff",
		  width: 490,
		  height: 265,
		  modal: true,
		  buttons: {
			"Ok": function() {
				
				var villageObj;
				var villageCode = "no found";
				var coordinator = "0,0";
				var searchVillageCode = "";

				var ouOptionSelected = $("[name='deOrgUnitSelectorOption']:checked").val();
				if( ouOptionSelected == 'villageByHeathCenter' )
				{
					searchVillageCode = me.deOrgunitListTag.val()
				}
				else
				{
					searchVillageCode = me.deVillageListTag.val();
				}
				
				// Find the village
				var villageFound = me.findVillageByCode( searchVillageCode );
					
				if( villageFound.villageObj !== undefined )
				{
					villageCode = villageFound.villageObj.code;
					coordinator = villageFound.villageObj.lat + "," + villageFound.villageObj.lng;
				}
				
				me.inputCodeTag.val( villageCode );
				me.inputCodeTag.change();
				me.inputGPSTag.val( coordinator );
				me.inputGPSTag.change();
				
				$( this ).dialog( "close" );
			}  
			,"Cancel": function() {
				$( this ).dialog( "close" );
			}
		  }
		});		
	};

	
	me.openForm = function()
	{
		me.loadOrgUnitL5( function(){
			var searchCode = me.inputCodeTag.val();
			me.populateVillagebyCode( searchCode );
		});
		
		me.dialogFormTag.show();
		me.dialogFormTag.dialog( "open" );
		
	};
	
	me.populateVillagebyCode = function( searchCode )
	{
		// STEP 1. Show the selected orgunit in [Village by HC] selector
		me.deOrgunitListTag.val( searchCode );
		if( searchCode != "" )
		{
			me.villageByHeathCenterOptionTag.prop( "checked", false );
			me.villageByOULevelTag.prop( "checked", true );
		}
		else
		{
			me.villageByHeathCenterOptionTag.prop( "checked", true );
			me.villageByOULevelTag.prop( "checked", false );
		}
		
		me.deOrgUnitSelectorOptionOnChange();
		
		// STEP 2. Display the selected orgunit of [Village by HC] selector in [Village by Provice/ Dist/ Commune] section if any
		
		var villageObj;
		var provinceCode ;
		var districtCode;
		var communeCode;
		
		// Find the village
		var villageFound = me.findVillageByCodeInGSheet( searchCode );
		
		if( villageFound.villageObj !== undefined )
		{
			me.deProvinceListTag.val( villageFound.provinceCode );
			me.deProvinceListTag.change();
			
			me.deDistritListTag.val( villageFound.districtCode );
			me.deDistritListTag.change();
			
			me.deCommuneListTag.val( villageFound.communeCode );
			me.deCommuneListTag.change();
			
			me.deVillageListTag.val( villageFound.villageObj.code );
		}
		else
		{
			me.deProvinceListTag.val( "" );
			me.deProvinceListTag.change();
			
			me.deDistritListTag.val( "" );
			me.deCommuneListTag.val( "" );
			me.deVillageListTag.val( "" );
		}
	};

	me.findVillageByCode = function( searchCode )
	{
		var ouOptionSelected = $("[name='deOrgUnitSelectorOption']:checked").val();
		if( ouOptionSelected == 'villageByHeathCenter' )
		{
			return me.findVillageByCodeInGSheet( searchCode );
		}
		
		return {
				"villageObj": JSON.parse( me.deVillageListTag.find("option:selected").attr("jsonData") )
				,"provinceCode": me.deProvinceListTag.val()
				,"districtCode": me.deDistritListTag.val()
				,"communeCode": me.deCommuneListTag.val()
			}
	};	
		
	me.findVillageByCodeInGSheet = function( searchCode )
	{
		var villageObj;
		
		for( var i in me.provinceHierarchy )
		{
			if( villageObj !== undefined ) break;
			
			provinceCode = me.provinceHierarchy[i].code;
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).districts;
			for( var j in districtList )
			{
				if( villageObj !== undefined ) break;
				
				districtCode = districtList[j].code;
				var communeList = Util.findItemFromList( districtList, "code", districtCode );
				if( communeList !== undefined )
				{
					
					if( villageObj !== undefined ) break;
					
					communeList = communeList.communes;
					for( var k in communeList )
					{
						communeCode = communeList[k].code;
						var villageList = Util.findItemFromList( communeList, "code", communeCode ).villages;
						if( villageList !== undefined && villageObj == undefined )
						{
							villageObj = Util.findItemFromList( villageList, "code", searchCode );
							
							return {
								"villageObj": villageObj
								,"provinceCode": provinceCode
								,"districtCode": districtCode
								,"communeCode": communeCode
							}
						}
					}
				}
			}
		}
		
		return {};
	};
	
	
	me.setUp_Events = function()
	{
		me.deOrgUnitSelectorOptionTag.click( function(){
			me.deOrgUnitSelectorOptionOnChange();
		});
	
		me.deProvinceListTag.change( function(){
			me.deDistritListTag.find("option").remove();
			me.deCommuneListTag.find("option").remove();
			me.deVillageListTag.find("option").remove();
			
			me.loadDistrictList( me.deProvinceListTag.val() );
		});
		
		me.deDistritListTag.change( function(){
			me.deCommuneListTag.find("option").remove();
			me.deVillageListTag.find("option").remove();
			
			me.loadCommuneList( me.deProvinceListTag.val(), me.deDistritListTag.val() );
		});
		
		me.deCommuneListTag.change( function(){
			me.deVillageListTag.find("option").remove();
			
			me.loadVillageList( me.deProvinceListTag.val(), me.deDistritListTag.val(), me.deCommuneListTag.val() );
		});
	};
	
	me.deOrgUnitSelectorOptionOnChange = function()
	{
		var optionVal = $("[name='deOrgUnitSelectorOption']:checked").val();
		if( optionVal == "villageByHeathCenter" )
		{
			Util.disableTag( me.deOrgunitListTag, false );
			Util.disableTag( me.deProvinceListTag, true );
			Util.disableTag( me.deDistritListTag, true );
			Util.disableTag( me.deCommuneListTag, true );
			Util.disableTag( me.deVillageListTag, true );
		}
		else if( optionVal == "villageByOULevel" )
		{
			Util.disableTag( me.deOrgunitListTag, true );
			Util.disableTag( me.deProvinceListTag, false );
			Util.disableTag( me.deDistritListTag, false );
			Util.disableTag( me.deCommuneListTag, false );
			Util.disableTag( me.deVillageListTag, false );
		}
	};
	
	// --------------------------------------------------------------------------
	// Load Organisation Unit in levels
	// --------------------------------------------------------------------------
	
	me.loadOrgUnitL5 = function( exeFunc )
	{
		Util.disableTag( me.deOrgunitListTag, true );
		me.deOrgunitListTag.find("option").remove();
		me.deOrgunitListTag.append("<option>Loading</option>");
		
		var url = me._queryURL_orgUnit_L5;
		url = url.replace( me.PARAM_ORGUNITID, me.TabularDEObj.searchPanel.getOrgUnitId() );
		RESTUtil.getAsynchData( url
			, function( jsonData )
			{
				me.deOrgunitListTag.find("option").remove();
				me.deOrgunitListTag.append( $( '<option value="">[Select Village]</option>' ) );
				for( var i in jsonData.organisationUnits )
				{
					var item = jsonData.organisationUnits[i];
					me.deOrgunitListTag.append( $( '<option></option>' ).attr( "value", item.code ).text( item.name ) );
				}
				
				Util.disableTag( me.deOrgunitListTag, false );	

				if( exeFunc !== undefined ) exeFunc();		
			}
		);
	};
	
	me.loadProvinces = function()
	{
		me.deProvinceListTag.append( $( '<option value="">[Select Province]</option>' ) );
		for( var i in me.provinceHierarchy )
		{
			var item = me.provinceHierarchy[i];
			me.deProvinceListTag.append( $( '<option></option>' ).attr( "value", item.code ).text( item.name ) );
		}
	};
	
	me.loadDistrictList = function( provinceCode )
	{
		me.deDistritListTag.find("option").remove();
		me.deDistritListTag.append( $( '<option value="">[Select District]</option>' ) );
		
		if( provinceCode != "" )
		{
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).districts;
		
			for( var i in districtList )
			{
				var item = districtList[i];
				me.deDistritListTag.append( $( '<option></option>' ).attr( "value", item.code ).text( item.name ) );
			}
		}		
	};
	
	me.loadCommuneList = function( provinceCode, districtCode )
	{
		me.deCommuneListTag.find("option").remove();
		me.deCommuneListTag.append( $( '<option value="">[Select District]</option>' ) );
		
		if( districtCode != "" )
		{
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).districts;
			var communeList = Util.findItemFromList( districtList, "code", districtCode ).communes;
			
			for( var i in communeList )
			{
				var item = communeList[i];
				me.deCommuneListTag.append( $( '<option></option>' ).attr( "value", item.code ).text( item.name ) );
			}
		}
	};
	
	me.loadVillageList = function( provinceCode, districtCode, communeCode )
	{
		me.deVillageListTag.find("option").remove();
		me.deVillageListTag.append( $( '<option value="">[Select Village]</option>' ) );
			
		if( communeCode != "" )
		{
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).districts;
			var communeList = Util.findItemFromList( districtList, "code", districtCode ).communes;
			var villageList = Util.findItemFromList( communeList, "code", communeCode ).villages;
			
			for( var i in villageList )
			{
				var item = villageList[i];
				me.deVillageListTag.append( $( '<option></option>' )
					.attr( "value", item.code )
					.attr( "jsonData", JSON.stringify( item ) )
					.text( item.name ) );
			}
		}	
	};
	
	
	// --------------------------------------------------------------------------
	// RUN init
	// --------------------------------------------------------------------------
	
	me.initialSetup();
	
}