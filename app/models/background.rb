class Background < ApplicationRecord

	has_attached_file :image, styles: { large: '1000x1000>', medium: "300x300>", thumb: "100x100#" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  before_save :falsify_all_others, on: [ :create, :update ]

	 def as_json(_opts = {})
	 {
	    id: id,
	    name: name,
	    color: color,
	    status: status,
	    image: image_url_large,
	    errors: errors
	  }
	 end

   def image_url_large
    image.url(:large)
   end

   def falsify_all_others
   	 Background.where('id != ?', self.id).update_all("status = 'false'")
   end

end
