class Section < ApplicationRecord

	# has_many :item #, dependent: :destroy

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
