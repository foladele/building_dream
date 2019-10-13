class Section < ApplicationRecord

	validates_presence_of :title
	has_many :items , dependent: :destroy
	has_many :item_image, dependent: :destroy
	has_many :item_text, dependent: :destroy
	
	def as_json(_opts = {})
	 {
	    id: id,
	    title: title,
	    color: color,
	    collapse: collapse,
	    kind: kind,
	    errors: errors
	  }
	 end

end
